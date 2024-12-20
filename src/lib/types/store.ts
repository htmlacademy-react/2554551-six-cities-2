import {
  AuthorizationStatus,
  PlacesSortingName,
  ResponseStatus,
} from '../../const';
import { store } from '../../store';
import { City } from './city';
import { OfferFull, OfferPartial } from './offer';
import { SingleComment } from './comment';
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
  comment: SingleComment | undefined;
  commentResponseStatus: ResponseStatus;
  selectedOffer: OfferPartial | undefined;
  placesSorting: PlacesSortingName;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
