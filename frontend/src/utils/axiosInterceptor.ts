import axios from 'axios';

const cookieName = '_auth';
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
        if (
          message === userNoExist ||
          message === userRecentlyChangedPassword
        ) {
          // Logout if user does not exist or recently changed password
          axios.post('/api/v1/users/logout');
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          window.location.href = '/';
        }
      }
      return Promise.reject(error);
    }
  );
};
