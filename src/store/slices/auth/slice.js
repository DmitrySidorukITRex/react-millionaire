import { createSlice } from '@reduxjs/toolkit';
import { name } from './constants';
import { login, signup } from './thunks';

const initialState = {
  token: null,
  user: null,
  loggedIn: false,
  loading: false,
  error: null,
};

export const auth = createSlice({
  name,
  initialState,
  reducers: {
    logout() {
      localStorage.clear();
      return initialState;
    },
    resetAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        return {
          ...state,
          loading: false,
          error: null,
          loggedIn: true,
          token,
          user,
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        return {
          ...state,
          loading: false,
          error: null,
          loggedIn: true,
          token,
          user,
        };
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, resetAuthError } = auth.actions;
