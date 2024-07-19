import reservationService from "../../services/reservationService.js";

describe("ReservationService", () => {
  beforeAll(() => {
    reservationService["_isInitialized"] = false;
    reservationService["_totalTableCount"] = 0;
    reservationService["_remainingTable"] = 0;
  });

  test("initializeTables should initialize tables", () => {
    const result = reservationService.initializeTable(10);
    expect(result).toBe("Tables initialized successfully.");
    expect(reservationService["isInitialized"]).toBe(true);
    expect(reservationService["totalTableCount"]).toBe(10);
    expect(reservationService["remainingTable"]).toBe(10);
  });

  test("initializeTable should get an error after initialize", () => {
    expect(() => reservationService.initializeTable(10)).toThrow(
      "Tables have already been initialized."
    );
  });
});
