import axios from 'axios';

export const getBasket = () => {
  return axios
    .get<Response<Basket>>('/api/v1/baskets')
    .then(res => res.data.data.data);
};

export const updateBasket = (basket: Basket) => {
  return axios
    .patch<Response<Basket>>(`/api/v1/baskets/${basket._id}`, {
      products: basket.products,
    })
    .then(res => res.data.data.data);
};
