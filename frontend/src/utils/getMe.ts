import axios from 'axios';

const getMe = async () => {
  const response = await axios.get('/api/v1/users/me');
  const { data } = response.data.data;
  return data;
};

export default getMe;
