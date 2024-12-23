import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStatus } from '../../const';
import { OffersState } from '../../lib/types/store';
import { changeFavoriteStatus, getOffer, getOffers } from '../api-actions';
import { OfferFull, OfferPartial } from '../../lib/types/offer';
import { FavoriteStatusChange } from '../../lib/types/favorite';

const initialState: OffersState = {
  offers: [],
  offersResponseStatus: ResponseStatus.Idle,
  offer: undefined,
  offerResponseStatus: ResponseStatus.Idle,
  selectedOffer: undefined,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    selectCurrentOffer: (
      state,
      action: PayloadAction<OfferPartial | undefined>
    ) => {
      state.selectedOffer = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getOffers.pending, (state) => {
        state.offers = [];
        state.offersResponseStatus = ResponseStatus.Pending;
      })
      .addCase(
        getOffers.fulfilled,
        (state, action: PayloadAction<OfferPartial[]>) => {
          state.offers = action.payload;
          state.offersResponseStatus = ResponseStatus.Success;
        }
      )
      .addCase(getOffers.rejected, (state) => {
        state.offers = [];
        state.offersResponseStatus = ResponseStatus.Error;
      })
      .addCase(getOffer.pending, (state) => {
        state.offer = undefined;
        state.offerResponseStatus = ResponseStatus.Pending;
      })
      .addCase(
        getOffer.fulfilled,
        (state, action: PayloadAction<OfferFull>) => {
          state.offer = action.payload;
          state.offerResponseStatus = ResponseStatus.Success;
        }
      )
      .addCase(getOffer.rejected, (state) => {
        state.offer = undefined;
        state.offerResponseStatus = ResponseStatus.Error;
      })
      .addCase(
        changeFavoriteStatus.fulfilled,
        (state, action: PayloadAction<FavoriteStatusChange>) => {
          state.offers = state.offers.map((offer) =>
            offer.id === action.payload.id
              ? { ...offer, isFavorite: action.payload.data.isFavorite }
              : offer
          );

          if (state.offer) {
            state.offer.isFavorite = action.payload.data.isFavorite;
          }
        }
      ),
});

export const { selectCurrentOffer } = offersSlice.actions;

export default offersSlice.reducer;
