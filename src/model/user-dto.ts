import { BookingDto } from './booking-dto';

export interface UserDto {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  image: string;
  bookings: BookingDto[];
}
