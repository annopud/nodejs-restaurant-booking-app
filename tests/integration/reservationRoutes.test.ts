import request from 'supertest';
import app from '../../src/app.js';
import reservationService from '../../src/services/reservationService.js';
import { CancellationResult, ReservationDataTypes, ReservationResult } from '../../src/models/reservation.js';

describe('Reservation Routes', () => {
  beforeEach(() => {
    reservationService['_isInitialized'] = false;
    reservationService['_totalTableCount'] = 0;
    reservationService['_remainingTable'] = 0;
    reservationService['_reservationData'] = {} as ReservationDataTypes;
  });

  test("should error 400, 'Invalid number of tableCount.'", async () => {
    const res = await request(app).post('/api/initialize').send({
      tableCount: null,
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid number of tableCount.');
  });

  test("should initialize with status 200, 'Tables initialized successfully.'", async () => {
    const res = await request(app).post('/api/initialize').send({ tableCount: 10 });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Tables initialized successfully.');
  });

  test("should error 409, 'Tables have already been initialized.'", async () => {
    await request(app).post('/api/initialize').send({ tableCount: 10 });

    const res = await request(app).post('/api/initialize').send({ tableCount: 10 });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe('Tables have already been initialized.');
  });

  test('should reserve after initialize tables', async () => {
    const res = await request(app).post('/api/reserve').send({ customerCount: null });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe('Tables have not been initialized.');
  });

  test("reserve should return 400, 'Not enough tables available.'", async () => {
    await request(app).post('/api/initialize').send({ tableCount: 10 });

    const res = await request(app).post('/api/reserve').send({ customerCount: null });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid number of customerCount.');
  });

  test("reserve should return 409, 'Not enough tables available.'", async () => {
    await request(app).post('/api/initialize').send({ tableCount: 10 });

    const res = await request(app).post('/api/reserve').send({ customerCount: 41 });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe('Not enough tables available.');
  });

  test('should reserve success', async () => {
    await request(app).post('/api/initialize').send({ tableCount: 10 });

    const res = await request(app).post('/api/reserve').send({ customerCount: 40 });

    expect(res.status).toBe(200);
    expect(res.body.message).toEqual<ReservationResult>({
      bookingId: expect.any(String),
      bookedTableCount: 10,
      remainingTable: 0,
    });
  });

  test("cancel should return 409, 'Tables have not been initialized.'", async () => {
    const res = await request(app).post('/api/cancel').send({ bookingId: 'booking_1' });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe('Tables have not been initialized.');
  });

  test("cancel should return 400, 'Invalid bookingId.'", async () => {
    await request(app).post('/api/initialize').send({ tableCount: 10 });
    await request(app).post('/api/reserve').send({ customerCount: 6 });

    const res = await request(app).post('/api/cancel').send({ bookingId: null });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid bookingId.');
  });

  test("cancel should return 404, 'Booking ID not found.'", async () => {
    await request(app).post('/api/initialize').send({ tableCount: 10 });
    await request(app).post('/api/reserve').send({ customerCount: 6 });

    const res = await request(app).post('/api/cancel').send({ bookingId: 'wrong_booking_id' });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Booking ID not found.');
  });

  test("cancel should return 409, 'Tables have not been initialized.'", async () => {
    await request(app).post('/api/initialize').send({ tableCount: 10 });
    const reserveResponse = await request(app).post('/api/reserve').send({ customerCount: 6 });

    const res = await request(app).post('/api/cancel').send({ bookingId: reserveResponse.body.message.bookingId });

    expect(res.status).toBe(200);
    expect(res.body.message).toEqual<CancellationResult>({
      freedTableCount: 2,
      remainingTable: 10,
    });
  });
});
