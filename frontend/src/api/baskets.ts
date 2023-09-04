import axios from 'axios';

export const getBasket = () => {
  return axios
    .get<Response<Basket[]>>('/api/v1/baskets')
    .then(res => res.data.data.data[0]);
};
