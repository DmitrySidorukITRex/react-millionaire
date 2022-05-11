import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import reducer from './reducers';

export const store = configureStore({
  reducer,
});

export const useAppDispatch = () => useDispatch();
