import {
  AuthorizationStatus,
  PlacesSortingName,
  ResponseStatus,
} from '../../const';
import { store } from '../../store';
import { City } from './city';
import { OfferFull, OfferPartial } from './offer';
import { SingleComment } from './review';
import { User } from './user';

export type StoreState = {
  authorizationStatus: AuthorizationStatus;
  user: User | undefined;
  activeCity: City;
  offers: OfferPartial[];
  offersResponseStatus: ResponseStatus;
  offer: OfferFull | undefined;
  offerResponseStatus: ResponseStatus;
  nearbyOffers: OfferPartial[];
  nearbyOffersResponseStatus: ResponseStatus;
  comments: SingleComment[];
  commentsResponseStatus: ResponseStatus;
  selectedOffer: OfferPartial | undefined;
  placesSorting: PlacesSortingName;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
