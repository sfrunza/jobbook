import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoggingIn: false,
  isLoggingOut: false,
  isVerifying: false,
  loginError: false,
  logoutError: false,
  isAuthenticated: false,
  verifyingError: false,
  isUpdating: false,
  updateError: false,
  user: null,
  uError: '',
  error: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.isLoggingIn = true;
      state.loginError = false;
    },
    loginSuccess(state, action) {
      state.isLoggingIn = false;
      state.isAuthenticated = true;
      state.error = '';
      state.user = action.payload;
    },
    loginFailure(state, action) {
      state.isLoggingIn = false;
      state.isAuthenticated = false;
      state.loginError = true;
      state.error = action.payload;
    },
    logoutRequest(state) {
      state.isLoggingOut = true;
      state.logoutError = false;
    },
    logoutSuccess(state) {
      state.isLoggingOut = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailure(state) {
      state.isLoggingOut = false;
      state.logoutError = true;
    },
    verifyRequest(state) {
      state.isVerifying = true;
      state.verifyingError = false;
    },
    verifySuccess(state) {
      state.isVerifying = false;
    },
    verifyError(state, action) {
      state.isVerifying = false;
      state.error = action.payload;
      state.user = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    updateRequest(state) {
      state.isUpdating = true;
      state.updateError = false;
    },
    updateSuccess(state, action) {
      state.isUpdating = false;
      state.user = action.payload;
    },
    updateFailure(state, action) {
      state.isUpdating = false;
      state.updateError = true;
      state.uError = action.payload;
    },
  },
});

export const { reducer } = slice;

export const loginUser = (user, navigate) => (dispatch) => {
  axios
    .post('/users/sign_in', { user }, { withCredentials: true })
    .then((res) => {
      // console.log(res);
      if (res.data.current_user) {
        let user = res.data.current_user;
        dispatch(slice.actions.loginSuccess(user));
        navigate('/');
      } else {
        // console.log(res.data.errors);
        dispatch(slice.actions.loginFailure(res.data.errors));
      }
      return res.json;
    })
    .then((data) => console.log(data))
    .catch((error) => {
      // console.log(error);
      dispatch(slice.actions.loginFailure(error.message));
    });
};

export const logoutUser = (navigate) => async (dispatch) => {
  dispatch(slice.actions.logoutRequest());
  try {
    const res = await fetch('/users/sign_out', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      dispatch(slice.actions.logoutSuccess());
      navigate('/login');
    } else {
      dispatch(slice.actions.logoutFailure());
    }
  } catch (error) {
    dispatch(slice.actions.logoutFailure());
    console.error('error', error);
    return true;
  }
};

export const updateUser = (userId, update) => async (dispatch) => {
  dispatch(slice.actions.updateRequest());
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update),
  };
  await fetch(`/api/v1/users/${userId}`, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(slice.actions.updateSuccess(data));
    })
    .catch((error) => {
      dispatch(slice.actions.updateFailure(error.message));
    });
};

export const verifyAuth = () => (dispatch) => {
  dispatch(slice.actions.verifyRequest());
  axios
    .get('/api/v1/users', { withCredentials: true })
    .then((response) => {
      if (response.data.current_user) {
        dispatch(slice.actions.loginSuccess(response.data.current_user));
      } else {
        dispatch(slice.actions.verifyError());
      }

      dispatch(slice.actions.verifySuccess());
    })
    .catch((error) => dispatch(slice.actions.verifyError(error.message)));
};

export const uploadProfilePicture = (formData, userId) => async (dispatch) => {
  const configurationObject = {
    method: 'PUT',
    body: formData,
  };
  await fetch(`/api/v1/users/${userId}`, configurationObject)
    .then((r) => {
      return r.json();
    })
    .then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // this is where I will dispatch an action creator function to update my store
        dispatch(slice.actions.updateSuccess(data));
      }
    })
    .catch((error) => dispatch(slice.actions.updateFailure(error.message)));
};
export default slice;
