import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../lib/types/store';

const getActiveCity = (state: RootState) => state.city.activeCity;

export const selectActiveCity = createSelector(
  [(state: RootState) => state],
  getActiveCity
);
