import { AmenitiesDto } from './amenities-dto';

export interface RoomsDto {
  roomId: number;
  roomName: string;
  maxGuest: number;
  pricePerNight: number;
  roomCover: string;
  description: string;
  averageRating: number;
  location: string;
  amenities: AmenitiesDto[];
}
