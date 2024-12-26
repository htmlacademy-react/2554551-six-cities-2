import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../lib/types/store';

const getAlertMessage = (state: RootState) => state.alert.message;

const getAlertIsShown = (state: RootState) => state.alert.isShown;

export const selectAlertMessage = createSelector(
  [(state: RootState) => state],
  getAlertMessage
);

export const selectAlertIsShown = createSelector(
  [(state: RootState) => state],
  getAlertIsShown
);
