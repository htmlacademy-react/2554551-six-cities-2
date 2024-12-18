import {
  AuthorizationStatus,
  PlacesSortingName,
  ResponseStatus,
} from '../../const';
import { store } from '../../store';
import { City } from './city';
import { SingleOffer } from './offer';
import { SingleComment } from './review';
import { User } from './user';

export type StoreState = {
  authorizationStatus: AuthorizationStatus;
  user: User | undefined;
  activeCity: City;
  offers: SingleOffer[];
  offersResponseStatus: ResponseStatus;
  offer: SingleOffer | undefined;
  offerResponseStatus: ResponseStatus;
  nearbyOffers: SingleOffer[];
  nearbyOffersResponseStatus: ResponseStatus;
  comments: SingleComment[];
  commentsResponseStatus: ResponseStatus;
  selectedOffer: SingleOffer | undefined;
  placesSorting: PlacesSortingName;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
