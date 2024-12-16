import { createSelector } from '@reduxjs/toolkit';
import { PlacesSortingName } from '../const';
import { SingleOffer } from '../lib/types/offer';
import { RootState } from '../lib/types/store';

export const selectAllOffers = (state: RootState) => state;

const getFilteredOffers = (state: RootState) =>
  state.offerList.filter((offer) => offer.city.name === state.activeCity.name);

export const selectFilteredOffers = createSelector(
  [selectAllOffers],
  getFilteredOffers
);

export const getSortedOffers = (
  offers: SingleOffer[],
  sortBy: PlacesSortingName
) => {
  switch (sortBy) {
    case PlacesSortingName.LowToHigh:
      return offers.sort((a, b) => a.price - b.price);
    case PlacesSortingName.HighToLow:
      return offers.sort((a, b) => b.price - a.price);
    case PlacesSortingName.Rating:
      return offers.sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};
