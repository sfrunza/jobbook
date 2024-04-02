import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer, verifyAuth } from '../slices/auth';
import { reducer as settingsReducer, getSettings } from '../slices/settings';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
  },
});
store.dispatch(verifyAuth());
store.dispatch(getSettings());

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();
