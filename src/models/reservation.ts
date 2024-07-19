export interface Reservation {
  bookingId: string;
  tableCount: number;
}

export interface ReservationDataTypes {
  [key: string]: Reservation;
}

export interface ReservationResult {
  bookingId: string;
  bookedTableCount: number;
  remainingTable: number;
}
