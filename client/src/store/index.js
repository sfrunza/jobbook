import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer } from '../slices/auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();
