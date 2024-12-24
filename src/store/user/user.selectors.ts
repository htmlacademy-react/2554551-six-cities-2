import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../lib/types/store';

const getUser = (state: RootState) => state.user.user;

const getAuthorizationStatus = (state: RootState) =>
  state.user.authorizationStatus;

const getLoginResponseStatus = (state: RootState) =>
  state.user.loginResponseStatus;

export const selectUser = createSelector(
  [(state: RootState) => state],
  getUser
);

export const selectAuthorizationStatus = createSelector(
  [(state: RootState) => state],
  getAuthorizationStatus
);

export const selectLoginResponseStatus = createSelector(
  [(state: RootState) => state],
  getLoginResponseStatus
);
