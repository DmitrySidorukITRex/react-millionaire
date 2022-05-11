import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './constants';
import { request } from '../../../core/utils/request';

export const getUsersRating = createAsyncThunk(`${name}/getUsersRating`, async () => {
  const { data } = await request({
    method: 'get',
    url: '/users/rating',
  });
  return data;
});

export const resetUserRating = createAsyncThunk(`${name}/resetUserRating`, async (id) => {
  const { data } = await request({
    method: 'patch',
    url: `/users/${id}/resetRating`,
  });
  return data;
});

export const removeUser = createAsyncThunk(`${name}/removeUser`, async (id) => {
  const { data } = await request({
    method: 'delete',
    url: `/users/${id}`,
  });
  return data;
});
