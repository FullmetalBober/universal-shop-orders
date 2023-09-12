import axios from 'axios';

export const createOrder = () => {
  return axios
    .post<Response<Order>>('/api/v1/orders/basket')
    .then(res => res.data.data.data);
};

type TGetOrders = {
  signal?: AbortSignal;
  status?: string;
};
export const getOrders = ({ signal, status }: TGetOrders) => {
  return axios
    .get<Response<Order[]>>('/api/v1/orders', { signal, params: { status } })
    .then(res => res.data.data.data);
};
