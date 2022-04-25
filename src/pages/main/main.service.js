import axios from 'axios';

export const getRounds = async () => {
  try {
    const response = await axios.get('http://localhost:5200/api/round/game');
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
