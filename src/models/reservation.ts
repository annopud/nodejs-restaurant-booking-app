export interface Reservation {
  bookingId: string;
  tableCount: number;
}

export interface ReservationDataTypes {
  [key: string]: Reservation;
}
