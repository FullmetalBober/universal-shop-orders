import axios from 'axios';

export const getUser = () => {
  return axios
    .get<Response<User>>('/api/v1/users/me/withoutVerified')
    .then(res => res.data.data.data);
};

export const logoutUser = () => {
  return axios.post('/api/v1/users/logout');
};
