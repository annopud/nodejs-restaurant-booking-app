import {
  CancellationResult,
  ReservationDataTypes,
  ReservationResult,
} from "../models/reservation.js";

export class ReservationService {
  private _totalTableCount: number;
  private _remainingTable: number;
  private _isInitialized: boolean;
  private _reservationData: ReservationDataTypes;

  constructor(
    totalTableCount: number,
    remainingTable: number,
    isInitialized: boolean,
    reservationData: ReservationDataTypes
  ) {
    this._totalTableCount = totalTableCount;
    this._remainingTable = remainingTable;
    this._isInitialized = isInitialized;
    this._reservationData = reservationData;
  }

  get totalTableCount(): number {
    return this._totalTableCount;
  }

  get remainingTable(): number {
    return this._remainingTable;
  }

  get isInitialized(): boolean {
    return this._isInitialized;
  }

  get reservationData(): ReservationDataTypes {
    return this._reservationData;
  }

  initializeTable(count: number): string | Error {
    if (this.isInitialized) {
      throw new Error("Tables have already been initialized.");
    }
    this._totalTableCount = count;
    this._remainingTable = count;
    this._isInitialized = true;
    return "Tables initialized successfully.";
  }

  reserveTable(customers: number | null): Error | ReservationResult {
    if (!this.isInitialized) {
      throw new Error("Tables have not been initialized.");
    }

    if (!customers || customers < 1) {
      throw new Error("Invalid number of customers.");
    }

    const requiredTables = Math.ceil(customers / 4);

    if (requiredTables > this.remainingTable) {
      throw new Error("Not enough tables available.");
    }

    const bookingId = `booking_${Date.now()}`;
    this.reservationData[bookingId] = {
      bookingId,
      tableCount: requiredTables,
    };
    this._remainingTable -= requiredTables;

    return {
      bookingId,
      bookedTableCount: requiredTables,
      remainingTable: this.remainingTable,
    };
  }

  cancelReservation(bookingId: string | null): Error | CancellationResult {
    if (!this.isInitialized) {
      throw new Error("Tables have not been initialized.");
    }

    if (!bookingId) {
      throw new Error("Invalid bookingId.");
    }

    const reservation = this.reservationData[bookingId];
    if (!reservation) {
      throw new Error("Booking ID not found.");
    }

    this._remainingTable += reservation.tableCount;
    delete this.reservationData[bookingId];

    return {
      freedTableCount: reservation.tableCount,
      remainingTable: this.remainingTable,
    };
  }
}

export default new ReservationService(0, 0, false, {});
