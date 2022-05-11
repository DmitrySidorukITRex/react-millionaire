import { createSlice } from '@reduxjs/toolkit';
import { name } from './constants';
import { getUsersRating, removeUser, resetUserRating } from './thunks';

const initialState = {
  users: [],
  activeUser: null,
  loading: true,
  error: null,
};

export const users = createSlice({
  name,
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
    resetActiveUser: (state) => {
      state.activeUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersRating.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersRating.fulfilled, (state, action) => {
        return {
          ...state,
          users: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(getUsersRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetUserRating.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetUserRating.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          error: null,
        };
      })
      .addCase(resetUserRating.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(removeUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          error: null,
        };
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

export const { setActiveUser, resetActiveUser } = users.actions;
