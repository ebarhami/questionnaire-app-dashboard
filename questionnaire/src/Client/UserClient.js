import axios from '../Util/axios';

export const createUser = data => {
  return axios({
    method: 'post',
    url: `users/`,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};