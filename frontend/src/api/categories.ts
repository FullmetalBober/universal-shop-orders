import axios from 'axios';

export const getCategories = () => {
  return axios
    .get<Response<Category[]>>('/api/v1/categories', {
      params: {
        sort: 'menuType,name',
      },
    })
    .then(res => res.data.data.data);
};
