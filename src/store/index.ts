import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { AppDispatch } from '../lib/types/store';
import { useDispatch } from 'react-redux';

export const store = configureStore({ reducer });

export const useAppDispatch: () => AppDispatch = useDispatch;
