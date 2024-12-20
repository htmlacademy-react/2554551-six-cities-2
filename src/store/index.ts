import { configureStore } from '@reduxjs/toolkit';
import { AppDispatch } from '../lib/types/store';
import { useDispatch } from 'react-redux';
import { createApi } from '../services/api';
import userSlice from './user/userSlice';
import offersSlice from './offers/offersSlice';
import commentsSlice from './comments/commentsSlice';
import nearPlacesSlice from './nearPlaces/nearPlacesSlice';
import citySlice from './city/citySlice';
import sortingSlice from './sorting/sortingSlice';

export const api = createApi();

export const store = configureStore({
  reducer: {
    user: userSlice,
    offers: offersSlice,
    comments: commentsSlice,
    nearPlaces: nearPlacesSlice,
    city: citySlice,
    sorting: sortingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }),
});

export const useAppDispatch: () => AppDispatch = useDispatch;
