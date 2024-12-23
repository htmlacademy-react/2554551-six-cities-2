import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStatus } from '../../const';
import { FavoritesState } from '../../lib/types/store';
import { changeFavoriteStatus, getFavorites } from '../api-actions';
import { OfferPartial } from '../../lib/types/offer';
import { FavoriteStatusChange } from '../../lib/types/favorite';

const initialState: FavoritesState = {
  favorites: [],
  favoritesResponseStatus: ResponseStatus.Idle,
  favoriteResponseStatus: ResponseStatus.Idle,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getFavorites.pending, (state) => {
        state.favoritesResponseStatus = ResponseStatus.Pending;
      })
      .addCase(
        getFavorites.fulfilled,
        (state, action: PayloadAction<OfferPartial[]>) => {
          state.favorites = action.payload;
          state.favoritesResponseStatus = ResponseStatus.Success;
        }
      )
      .addCase(getFavorites.rejected, (state) => {
        state.favorites = [];
        state.favoritesResponseStatus = ResponseStatus.Error;
      })
      .addCase(changeFavoriteStatus.pending, (state) => {
        state.favoriteResponseStatus = ResponseStatus.Pending;
      })
      .addCase(
        changeFavoriteStatus.fulfilled,
        (state, action: PayloadAction<FavoriteStatusChange>) => {
          state.favoriteResponseStatus = ResponseStatus.Success;

          if (action.payload.data.isFavorite) {
            const {
              id,
              title,
              type,
              price,
              city,
              location,
              isFavorite,
              isPremium,
              rating,
              previewImage,
            } = action.payload.data;

            state.favorites.push({
              id,
              title,
              type,
              price,
              city,
              location,
              isFavorite,
              isPremium,
              rating,
              previewImage,
            });
          } else {
            state.favorites = state.favorites.filter(
              (favorite) => favorite.id !== action.payload.id
            );
          }
        }
      )
      .addCase(changeFavoriteStatus.rejected, (state) => {
        state.favoriteResponseStatus = ResponseStatus.Error;
      }),
});

export default favoritesSlice.reducer;
