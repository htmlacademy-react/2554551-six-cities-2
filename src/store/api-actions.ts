import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { SingleOffer } from '../lib/types/offer';
import { Extra } from '../lib/types/api';
import { User, UserAuth } from '../lib/types/user';
import { setCookie } from '../services/cookie';

export const checkLogin = createAsyncThunk<User, undefined, Extra>(
  'user/check',
  async (_, { extra: api }) => {
    const { data } = await api.get<User>(APIRoute.Login);

    return data;
  }
);

export const login = createAsyncThunk<User, UserAuth, Extra>(
  'user/login',
  async (userData, { extra: api }) => {
    const { data } = await api.post<User>(APIRoute.Login, userData);

    setCookie(data.token);

    return data;
  }
);

export const getOffers = createAsyncThunk<SingleOffer[], undefined, Extra>(
  'offers/getAll',
  async (_, { extra: api }) => {
    const { data } = await api.get<SingleOffer[]>(APIRoute.Offers);

    return data;
  }
);
