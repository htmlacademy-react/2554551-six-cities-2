import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  changeAuthorizationStatus,
  getAllOffers,
  selectCity,
  selectOffer,
  sortPlaces,
  updateComments,
} from './actions';
import {
  AuthorizationStatus,
  CITIES,
  PlacesSortingName,
  ResponseStatus,
} from '../const';
import {
  checkLogin,
  createComment,
  getComments,
  getNearbyOffers,
  getOffer,
  getOffers,
  login,
} from './api-actions';
import { StoreState } from '../lib/types/store';
import { OfferPartial } from '../lib/types/offer';
import { User } from '../lib/types/user';
import { SingleComment } from '../lib/types/comment';

const initialState: StoreState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
  activeCity: CITIES[0],
  offers: [],
  offersResponseStatus: ResponseStatus.Idle,
  offer: undefined,
  offerResponseStatus: ResponseStatus.Idle,
  nearbyOffers: [],
  nearbyOffersResponseStatus: ResponseStatus.Idle,
  comments: [],
  commentsResponseStatus: ResponseStatus.Idle,
  comment: undefined,
  commentResponseStatus: ResponseStatus.Idle,
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
    .addCase(getAllOffers, (state, action: PayloadAction<OfferPartial[]>) => {
      state.offers = action.payload;
    })
    .addCase(
      selectOffer,
      (state, action: PayloadAction<OfferPartial | undefined>) => {
        state.selectedOffer = action.payload;
      }
    )
    .addCase(sortPlaces, (state, action: PayloadAction<PlacesSortingName>) => {
      state.placesSorting = action.payload;
    })
    .addCase(updateComments, (state, action: PayloadAction<SingleComment>) => {
      state.comments = [action.payload].concat(state.comments);
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
    })
    .addCase(getOffer.pending, (state) => {
      state.offer = undefined;
      state.offerResponseStatus = ResponseStatus.Pending;
    })
    .addCase(getOffer.fulfilled, (state, action) => {
      state.offer = action.payload;
      state.offerResponseStatus = ResponseStatus.Success;
    })
    .addCase(getOffer.rejected, (state) => {
      state.offer = undefined;
      state.offerResponseStatus = ResponseStatus.Error;
    })
    .addCase(getNearbyOffers.pending, (state) => {
      state.nearbyOffers = [];
      state.nearbyOffersResponseStatus = ResponseStatus.Pending;
    })
    .addCase(getNearbyOffers.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
      state.nearbyOffersResponseStatus = ResponseStatus.Success;
    })
    .addCase(getNearbyOffers.rejected, (state) => {
      state.nearbyOffers = [];
      state.nearbyOffersResponseStatus = ResponseStatus.Error;
    })
    .addCase(getComments.pending, (state) => {
      state.comments = [];
      state.commentsResponseStatus = ResponseStatus.Pending;
    })
    .addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.commentsResponseStatus = ResponseStatus.Success;
    })
    .addCase(getComments.rejected, (state) => {
      state.comments = [];
      state.commentsResponseStatus = ResponseStatus.Error;
    })
    .addCase(createComment.pending, (state) => {
      state.comment = undefined;
      state.commentResponseStatus = ResponseStatus.Pending;
    })
    .addCase(createComment.fulfilled, (state, action) => {
      state.comment = action.payload;
      state.commentResponseStatus = ResponseStatus.Success;
    })
    .addCase(createComment.rejected, (state) => {
      state.comment = undefined;
      state.commentResponseStatus = ResponseStatus.Error;
    });
});
