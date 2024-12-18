import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { OfferFull, OfferPartial } from '../lib/types/offer';
import { Extra } from '../lib/types/api';
import { User, UserAuth } from '../lib/types/user';
import { setCookie } from '../services/cookie';
import { SingleComment } from '../lib/types/review';

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

export const getOffers = createAsyncThunk<OfferPartial[], undefined, Extra>(
  'offers/get',
  async (_, { extra: api }) => {
    const { data } = await api.get<OfferPartial[]>(APIRoute.Offers);

    return data;
  }
);

export const getOffer = createAsyncThunk<OfferFull, string, Extra>(
  'offer/get',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferFull>(`${APIRoute.Offers}/${offerId}`);

    return data;
  }
);

export const getNearbyOffers = createAsyncThunk<OfferPartial[], string, Extra>(
  'nearby/get',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferPartial[]>(
      `${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`
    );

    return data;
  }
);

export const getComments = createAsyncThunk<SingleComment[], string, Extra>(
  'comments/get',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<SingleComment[]>(
      `${APIRoute.Comments}/${offerId}`
    );

    return data;
  }
);
