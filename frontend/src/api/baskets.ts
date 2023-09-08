import axios from 'axios';

type GetBasket = {
  signal?: AbortSignal;
  params?: QueryParams;
};
export const getBasket = (props?: GetBasket) => {
  const { signal, params } = props || {};

  return axios
    .get<Response<Basket>>('/api/v1/baskets', {
      signal,
      params,
    })
    .then(res => res.data.data.data);
};

export const updateBasket = (products: any) => {
  return axios
    .patch<Response<Basket>>(`/api/v1/baskets`, {
      products,
    })
    .then(res => res.data.data.data);
};
