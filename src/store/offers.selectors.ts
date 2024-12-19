import { createSelector } from '@reduxjs/toolkit';
import { PlacesSortingName } from '../const';
import { OfferPartial } from '../lib/types/offer';
import { RootState } from '../lib/types/store';

const selectAllOffers = (state: RootState) => state;

const getFilteredOffers = (state: RootState) =>
  state.offers.filter((offer) => offer.city.name === state.activeCity.name);

export const selectFilteredOffers = createSelector(
  [selectAllOffers],
  getFilteredOffers
);

export const getSortedOffers = (
  offers: OfferPartial[],
  sortBy: PlacesSortingName
) => {
  const offersCopy = [...offers];

  switch (sortBy) {
    case PlacesSortingName.LowToHigh:
      return offersCopy.sort((a, b) => a.price - b.price);
    case PlacesSortingName.HighToLow:
      return offersCopy.sort((a, b) => b.price - a.price);
    case PlacesSortingName.Rating:
      return offersCopy.sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};
