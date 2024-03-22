export interface BookingDto {
   roomId: number;
   userId?: number | null;
   checkInDate: Date;
   checkOutDate: Date;
   totalPrice?: number;
 }
 