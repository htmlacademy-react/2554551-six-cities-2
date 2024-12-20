import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { getAllOffers, selectCity, selectOffer, sortPlaces } from './actions';
import { StoreState } from '../lib/types/store';
import { CITIES, PlacesSortingName, ResponseStatus } from '../const';
import { SingleOffer } from '../lib/types/offer';
import { getOffers } from './api-actions';

const initialState: StoreState = {
  activeCity: CITIES[0],
  offers: [],
  offersResponseStatus: ResponseStatus.Idle,
  selectedOffer: undefined,
  placesSorting: PlacesSortingName.Popular,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action: PayloadAction<string>) => {
      state.activeCity =
        CITIES.find((city) => city.name === action.payload) || CITIES[0];
    })
    .addCase(getAllOffers, (state, action: PayloadAction<SingleOffer[]>) => {
      state.offers = action.payload;
    })
    .addCase(
      selectOffer,
      (state, action: PayloadAction<SingleOffer | undefined>) => {
        state.selectedOffer = action.payload;
      }
    )
    .addCase(sortPlaces, (state, action: PayloadAction<PlacesSortingName>) => {
      state.placesSorting = action.payload;
    })
    .addCase(getOffers.pending, (state) => {
      state.offers = [];
      state.offersResponseStatus = ResponseStatus.Pending;
    })
    .addCase(getOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.offersResponseStatus = ResponseStatus.Success;
    })
    .addCase(getOffers.rejected, (state) => {
      state.offers = [];
      state.offersResponseStatus = ResponseStatus.Error;
    });
});
