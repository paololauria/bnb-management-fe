export interface BookingDto {
  bookingId: number; 
  roomId: number;
   userId?: number | null;
   checkInDate: Date;
   checkOutDate: Date;
   totalPrice?: number;
   roomCover: string;
 }
 