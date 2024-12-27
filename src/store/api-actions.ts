import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { OfferFavorite, OfferFull, OfferPartial } from '../lib/types/offer';
import { Extra } from '../lib/types/api';
import { User, UserAuth } from '../lib/types/user';
import { deleteCookie, setCookie } from '../services/cookie';
import { NewOfferComment, SingleComment } from '../lib/types/comment';
import { FavoriteStatusChange, NewFavoriteStatus } from '../lib/types/favorite';

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

export const logout = createAsyncThunk<void, undefined, Extra>(
  'user/logout',
  async (_, { extra: api }) => {
    await api.delete<User>(APIRoute.Logout);

    deleteCookie();
  }
);

export const getOffers = createAsyncThunk<OfferPartial[], undefined, Extra>(
  'offers/getAll',
  async (_, { extra: api }) => {
    const { data } = await api.get<OfferPartial[]>(APIRoute.Offers);

    return data;
  }
);

export const getOffer = createAsyncThunk<OfferFull, string, Extra>(
  'offers/getOne',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferFull>(`${APIRoute.Offers}/${offerId}`);

    return data;
  }
);

export const getNearbyOffers = createAsyncThunk<OfferPartial[], string, Extra>(
  'nearPlaces/get',
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

export const createComment = createAsyncThunk<
  SingleComment,
  NewOfferComment,
  Extra
>('comments/create', async (commentData, { extra: api }) => {
  const { comment, rating } = commentData;
  const { data } = await api.post<SingleComment>(
    `${APIRoute.Comments}/${commentData.offerId}`,
    { comment, rating }
  );

  return data;
});

export const getFavorites = createAsyncThunk<OfferPartial[], undefined, Extra>(
  'favorites/get',
  async (_, { extra: api }) => {
    const { data } = await api.get<OfferPartial[]>(APIRoute.Favorites);

    return data;
  }
);

export const changeFavoriteStatus = createAsyncThunk<
  FavoriteStatusChange,
  NewFavoriteStatus,
  Extra
>('favorites/changeStatus', async (favoriteStatusData, { extra: api }) => {
  const { data } = await api.post<OfferFavorite>(
    `${APIRoute.Favorites}/${favoriteStatusData.offerId}/${favoriteStatusData.status}`
  );

  getFavorites();

  return { data, id: favoriteStatusData.offerId };
});
