import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { UserState } from '../../lib/types/store';
import { checkLogin, login } from '../api-actions';
import { User } from '../../lib/types/user';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
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
      }),
});

export default userSlice.reducer;
