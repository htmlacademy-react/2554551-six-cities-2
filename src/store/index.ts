import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { AppDispatch } from '../lib/types/store';
import { useDispatch } from 'react-redux';
import { createApi } from '../services/api';

export const api = createApi();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }),
});

export const useAppDispatch: () => AppDispatch = useDispatch;
