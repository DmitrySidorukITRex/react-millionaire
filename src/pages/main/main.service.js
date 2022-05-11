import { request } from '../../core/utils/request';

export const getRounds = async () => {
  try {
    const { data } = await request({
      method: 'get',
      url: '/rounds',
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateUserRating = async (id, gamesCount, scores) => {
  try {
    const { data } = await request({
      method: 'patch',
      url: `/users/${id}/rating`,
      data: { gamesCount, scores },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};
