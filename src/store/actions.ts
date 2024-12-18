import { createAction } from '@reduxjs/toolkit';
import { OfferPartial } from '../lib/types/offer';
import { AuthorizationStatus, PlacesSortingName } from '../const';

export const selectCity = createAction('city/select', (city: string) => ({
  payload: city,
}));

export const getAllOffers = createAction(
  'offers/getAll',
  (offers: OfferPartial[]) => ({
    payload: offers,
  })
);

export const selectOffer = createAction(
  'offer/select',
  (offer?: OfferPartial | undefined) => ({ payload: offer })
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
