import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  extraTime: null,
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings(state, action) {
      state.extraTime = action.payload.extra_time;
    },
  },
});

export const { reducer } = slice;

export const getSettings = () => (dispatch) => {
  axios
    .get('/api/v1/settings/1', { withCredentials: true })
    .then((response) => {
      if (response.data) {
        dispatch(slice.actions.setSettings(response.data));
      } else {
        console.log('error');
      }
    })
    .catch((error) => console.log('api errors:', error));
};

export default slice;
