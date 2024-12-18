import { createAction } from '@reduxjs/toolkit';
import { SingleOffer } from '../lib/types/offer';
import { AuthorizationStatus, PlacesSortingName } from '../const';

export const selectCity = createAction('city/select', (city: string) => ({
  payload: city,
}));

export const getAllOffers = createAction(
  'offers/getAll',
  (offers: SingleOffer[]) => ({
    payload: offers,
  })
);

export const selectOffer = createAction(
  'offer/select',
  (offer?: SingleOffer | undefined) => ({ payload: offer })
);

export const sortPlaces = createAction(
  'places/sort',
  (sortBy: PlacesSortingName) => ({
    payload: sortBy,
  })
);

export const changeAuthorizationStatus = createAction(
  'user/changeAuthStatus',
  (authorizationStatus: AuthorizationStatus) => ({
    payload: authorizationStatus,
  })
);
