import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './constants';
import { request } from '../../../core/utils/request';

export const login = createAsyncThunk(`${name}/login`, async (loginObj, thunkApi) => {
  try {
    const { data } = await request({
      method: 'post',
      url: '/auth/login',
      data: loginObj,
    });
    if (data.token) {
      localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }

    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const signup = createAsyncThunk(`${name}/register`, async (user, thunkApi) => {
  try {
    const { data } = await request({
      method: 'post',
      url: '/auth/register',
      data: user,
    });
    if (data.token) {
      localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }

    return thunkApi.rejectWithValue(err.response.data);
  }
});
