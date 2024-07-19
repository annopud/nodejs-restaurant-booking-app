import request from "supertest";
import app from "../../app.js";
import reservationService from "../../services/reservationService.js";
import { ReservationDataTypes } from "../../models/reservation.js";

describe("Reservation Routes", () => {
  beforeEach(() => {
    reservationService["_isInitialized"] = false;
    reservationService["_totalTableCount"] = 0;
    reservationService["_remainingTable"] = 0;
    reservationService["_reservationData"] = {} as ReservationDataTypes;
  });

  test("should error 400, 'Invalid number of tableCount.'", async () => {
    const res = await request(app).post("/api/initialize").send({
      tableCount: null,
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Invalid number of tableCount.");
  });

  test("should error 409, 'Tables have already been initialized.'", async () => {
    await request(app).post("/api/initialize").send({ tableCount: 10 });

    const res = await request(app)
      .post("/api/initialize")
      .send({ tableCount: 10 });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe("Tables have already been initialized.");
  });
});
