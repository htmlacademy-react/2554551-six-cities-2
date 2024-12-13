import { SingleOffer } from '../lib/types/offer';

export const getFilteredOffersByCity = (
  offers: SingleOffer[],
  cityName: string
) => offers.filter((offer) => offer.city.name === cityName);
