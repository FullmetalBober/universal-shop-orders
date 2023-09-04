import axios from 'axios';

export const getNoveltyProducts = () => {
  return axios
    .get<Response<Product[]>>('/api/v1/products', {
      params: {
        limit: 15,
      },
    })
    .then(res => res.data.data.data);
};
