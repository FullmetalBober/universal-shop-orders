import axios from 'axios';

export const createOrder = () => {
  return axios
    .post<Response<Order>>('/api/v1/orders/basket')
    .then(res => res.data.data.data);
};
