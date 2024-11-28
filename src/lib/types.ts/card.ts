import { Rating } from './rating';

export type SingleCard = {
  id: number;
  isPremium: boolean;
  imgPath: string;
  price: number;
  inBookmarks: boolean;
  rating: Rating;
  placeName: string;
  placeType: string;
};
