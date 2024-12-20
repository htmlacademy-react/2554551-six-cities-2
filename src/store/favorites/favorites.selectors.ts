import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../lib/types/store';

const getFavorites = (state: RootState) => state.favorites.favorites;

const getFavoritesResponseStatus = (state: RootState) =>
  state.favorites.favoritesResponseStatus;

export const selectFavorites = createSelector(
  [(state: RootState) => state],
  getFavorites
);

export const selectFavoritesResponseStatus = createSelector(
  [(state: RootState) => state],
  getFavoritesResponseStatus
);
