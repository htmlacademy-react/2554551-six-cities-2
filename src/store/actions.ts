import { createAction } from '@reduxjs/toolkit';
import { SingleOffer } from '../lib/types/offer';

export const selectCity = createAction('city/select', (city: string) => ({
  payload: city,
}));

export const getOffers = createAction(
  'offers/getAll',
  (offers: SingleOffer[]) => ({
    payload: offers,
  })
);
