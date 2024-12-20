import { createSlice } from '@reduxjs/toolkit';
import { NearPlacesState } from '../../lib/types/store';
import { ResponseStatus } from '../../const';
import { getNearbyOffers } from '../api-actions';

const initialState: NearPlacesState = {
  nearbyOffers: [],
  nearbyOffersResponseStatus: ResponseStatus.Idle,
};

export const nearPlacesSlice = createSlice({
  name: 'nearPlaces',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
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
      }),
});

export default nearPlacesSlice.reducer;
