import { InitializationError } from "../errors/InitializationError.js";
import { InvalidInputError } from "../errors/InvalidInputError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ReservationError } from "../errors/ReservationError.js";
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

  initializeTable(tableCount: number | null): string | Error {
    if (this.isInitialized) {
      throw new InitializationError("Tables have already been initialized.");
    }

    if (!tableCount || tableCount < 1) {
      throw new InvalidInputError("Invalid number of tableCount.");
    }

    this._totalTableCount = tableCount;
    this._remainingTable = tableCount;
    this._isInitialized = true;
    return "Tables initialized successfully.";
  }

  reserveTable(customerCount: number | null): Error | ReservationResult {
    if (!this.isInitialized) {
      throw new InitializationError("Tables have not been initialized.");
    }

    if (!customerCount || customerCount < 1) {
      throw new InvalidInputError("Invalid number of customerCount.");
    }

    const requiredTables = Math.ceil(customerCount / 4);

    if (requiredTables > this.remainingTable) {
      throw new ReservationError("Not enough tables available.");
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
      throw new InitializationError("Tables have not been initialized.");
    }

    if (!bookingId) {
      throw new InvalidInputError("Invalid bookingId.");
    }

    const reservation = this.reservationData[bookingId];
    if (!reservation) {
      throw new NotFoundError("Booking ID not found.");
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
