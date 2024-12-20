import { createSelector } from '@reduxjs/toolkit';
import { PlacesSortingName } from '../../const';
import { OfferPartial } from '../../lib/types/offer';
import { RootState } from '../../lib/types/store';

const getFilteredOffers = (state: RootState) =>
  state.offers.offers.filter(
    (offer) => offer.city.name === state.city.activeCity.name
  );

const getOffersResponseStatus = (state: RootState) =>
  state.offers.offersResponseStatus;

const getOffer = (state: RootState) => state.offers.offer;

const getOfferResponseStatus = (state: RootState) =>
  state.offers.offersResponseStatus;

const getSelectedOffer = (state: RootState) => state.offers.selectedOffer;

export const selectFilteredOffers = createSelector(
  [(state: RootState) => state],
  getFilteredOffers
);

export const selectOffersResponseStatus = createSelector(
  [(state: RootState) => state],
  getOffersResponseStatus
);

export const selectOffer = createSelector(
  [(state: RootState) => state],
  getOffer
);

export const selectOfferResponseStatus = createSelector(
  [(state: RootState) => state],
  getOfferResponseStatus
);

export const selectSelectedOffer = createSelector(
  [(state: RootState) => state],
  getSelectedOffer
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
