import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { SingleOffer } from '../lib/types/offer';
import { AxiosInstance } from 'axios';

type Extra = {
  extra: AxiosInstance;
};

export const getOffers = createAsyncThunk<SingleOffer[], undefined, Extra>(
  'offers/getAll',
  async (_, { extra: api }) => {
    const { data } = await api.get<SingleOffer[]>(APIRoute.Offers);

    return data;
  }
);
