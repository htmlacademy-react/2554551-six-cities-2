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

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  loginResponseStatus: ResponseStatus;
  user: User | undefined;
};

export type OffersState = {
  offers: OfferPartial[];
  offersResponseStatus: ResponseStatus;
  offer: OfferFull | undefined;
  offerResponseStatus: ResponseStatus;
  selectedOfferId: string;
};

export type CommentsState = {
  comments: SingleComment[];
  commentsResponseStatus: ResponseStatus;
  commentResponseStatus: ResponseStatus;
};

export type NearPlacesState = {
  nearbyOffers: OfferPartial[];
  nearbyOffersResponseStatus: ResponseStatus;
};

export type CityState = { activeCity: City };

export type SortingState = {
  placesSorting: PlacesSortingName;
};

export type FavoritesState = {
  favorites: OfferPartial[];
  favoritesResponseStatus: ResponseStatus;
  favoriteResponseStatus: ResponseStatus;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
