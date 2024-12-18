import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  changeAuthorizationStatus,
  getAllOffers,
  selectCity,
  selectOffer,
  sortPlaces,
} from './actions';
import { StoreState } from '../lib/types/store';
import {
  AuthorizationStatus,
  CITIES,
  PlacesSortingName,
  ResponseStatus,
} from '../const';
import { SingleOffer } from '../lib/types/offer';
import { checkLogin, getOffers, login } from './api-actions';
import { User } from '../lib/types/user';

const initialState: StoreState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
  activeCity: CITIES[0],
  offers: [],
  offersResponseStatus: ResponseStatus.Idle,
  selectedOffer: undefined,
  placesSorting: PlacesSortingName.Popular,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
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
    .addCase(checkLogin.pending, (state) => {
      state.authorizationStatus = AuthorizationStatus.Unknown;
      state.user = undefined;
    })
    .addCase(checkLogin.fulfilled, (state, action: PayloadAction<User>) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
    })
    .addCase(checkLogin.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = undefined;
    })
    .addCase(login.pending, (state) => {
      state.authorizationStatus = AuthorizationStatus.Unknown;
      state.user = undefined;
    })
    .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
    })
    .addCase(login.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = undefined;
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
