import { User } from './user';

export type SingleReview = {
  id: number;
  imgPath: string;
  userName: string;
  rating: number;
  reviewText: string;
  dateTime: string;
  dateString: string;
};

export type SingleComment = {
  id: string;
  date: string;
  user: Omit<User, 'email' | 'token'>;
  comment: string;
  rating: number;
};
