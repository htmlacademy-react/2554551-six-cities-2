import { FavoriteStatus } from '../../const';
import { OfferFavorite } from './offer';

export type NewFavoriteStatus = {
  offerId: string;
  status: FavoriteStatus;
};

export type FavoriteStatusChange = { data: OfferFavorite; id: string };
