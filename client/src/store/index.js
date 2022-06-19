import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer, verifyAuth } from '../slices/auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
store.dispatch(verifyAuth());

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();
