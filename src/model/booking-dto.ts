export interface BookingDto {
  bookingId: number;
  roomName: string;
  roomId: number;
  userId?: number | null;
  checkInDate: Date;
  checkOutDate: Date;
  totalPrice?: number;
  roomCover: string;
  maxGuestRoom: number;
}
