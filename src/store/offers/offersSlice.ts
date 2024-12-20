import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStatus } from '../../const';
import { OffersState } from '../../lib/types/store';
import { getOffer, getOffers } from '../api-actions';
import { OfferFull, OfferPartial } from '../../lib/types/offer';

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
      }),
});

export const { selectCurrentOffer } = offersSlice.actions;

export default offersSlice.reducer;
