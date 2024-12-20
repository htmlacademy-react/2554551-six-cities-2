import { User } from './user';

export type NewComment = { comment: string; rating: number };

export type NewOfferComment = NewComment & { offerId: string };

export type SingleComment = NewComment & {
  id: string;
  date: string;
  user: Omit<User, 'email' | 'token'>;
};
