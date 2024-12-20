import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../lib/types/store';

const getPlacesSorting = (state: RootState) => state.sorting.placesSorting;

export const selectPlacesSorting = createSelector(
  [(state: RootState) => state],
  getPlacesSorting
);
