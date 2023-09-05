import axios from 'axios';

type LoginUser = {
  email: string;
  password: string;
};

type RegisterUser = LoginUser & {
  name: string;
  passwordConfirm: string;
};

export const getUser = () => {
  return axios
    .get<Response<User>>('/api/v1/users/me/withoutVerified')
    .then(res => res.data.data.data);
};

export const loginUser = (data: LoginUser) => {
  return axios
    .post<Response<User>>('/api/v1/users/login', data)
    .then(res => res.data.data.user);
};

export const registerUser = (data: RegisterUser) => {
  return axios
    .post<Response<User>>('/api/v1/users/signup', data)
    .then(res => res.data.data.user);
};

export const logoutUser = () => {
  return axios.post('/api/v1/users/logout');
};

export const activateUser = (emailToken: string) => {
  return axios.patch('/api/v1/users/activate/' + emailToken);
};

export const removeUser = (param = '') => {
  return axios.delete('/api/v1/users/deleteMe/' + param);
};
