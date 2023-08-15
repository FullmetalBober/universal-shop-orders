import axios from 'axios';

const userNoExist = 'The user belonging to this token does no longer exist.';
const userRecentlyChangedPassword =
  'User recently changed password! Please log in again.';

export const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        const message = error.response.data.message;
        if (message === userNoExist || message === userRecentlyChangedPassword)
          window.location.href = '/auth/hard-logout';
      }
      return Promise.reject(error);
    }
  );
};
