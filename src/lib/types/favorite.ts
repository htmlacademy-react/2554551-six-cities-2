import { CityName, FavoriteStatus } from '../../const';
import { OfferFavorite, OfferPartial } from './offer';

export type NewFavoriteStatus = {
  offerId: string;
  status: FavoriteStatus;
};

export type FavoriteStatusChange = { data: OfferFavorite; id: string };

export type FavoriteCity = Record<CityName, OfferPartial[]>;
