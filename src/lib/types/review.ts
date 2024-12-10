import { Rating } from './rating';

export type SingleReview = {
  id: number;
  imgPath: string;
  userName: string;
  rating: Rating;
  reviewText: string;
  dateTime: string;
  dateString: string;
};
