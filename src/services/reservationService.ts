import { ReservationDataTypes } from "../models/reservation.js";

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
    if (this._isInitialized) {
      throw new Error("Tables have already been initialized.");
    }
    this._totalTableCount = count;
    this._remainingTable = count;
    this._isInitialized = true;
    return "Tables initialized successfully.";
  }
}

export default new ReservationService(0, 0, false, {});
