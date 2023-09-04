import axios from 'axios';

export const getProducts = (queryParams: QueryObject) => {
  return axios
    .get<Response<Product[]>>('/api/v1/products', {
      params: queryParams,
    })
    .then(res => res.data.data.data);
};

export const getProductBySlug = (slug: string) => {
  return axios
    .get<Response<Product>>(`/api/v1/products/slug/${slug}`)
    .then(res => res.data.data.data);
};

export const getCountProducts = (queryParams: QueryObject) => {
  return axios
    .get<Response<number>>('/api/v1/products/count', {
      params: queryParams,
    })
    .then(res => res.data.data.data);
};

export const getNoveltyProducts = () => {
  return axios
    .get<Response<Product[]>>('/api/v1/products', {
      params: {
        limit: 15,
      },
    })
    .then(res => res.data.data.data);
};
