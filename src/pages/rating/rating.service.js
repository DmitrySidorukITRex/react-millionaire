import { request } from '../../core/utils/request';

export const getUsersRating = async () => {
  try {
    const { data } = await request({
      method: 'get',
      url: '/users/rating',
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const resetUserRating = async (id) => {
  try {
    const { data } = await request({
      method: 'patch',
      url: `/users/${id}/resetRating`,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const removeUser = async (id) => {
  try {
    const { data } = await request({
      method: 'delete',
      url: `/users/${id}`,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};
