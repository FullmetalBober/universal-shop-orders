import axios from 'axios';

const cookieName = '_auth';
const userNoExist = 'Користувач, якому належить цей токен, більше не існує.';
const userRecentlyChangedPassword =
  'Користувач нещодавно змінив пароль! Будь ласка, увійдіть знову.';
const userNotLoggedIn = 'Ви не авторизовані! Будь ласка, увійдіть, щоб отримати доступ.';

const removeCookie = () => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const logout = () => {
  axios.post('/api/v1/users/logout');
  removeCookie();
  window.location.href = '/';
};

export const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response;
    },
    function (error) {
      const message = error.response.data.message;

      if (error.response.status === 401) {
        if (message === userNoExist || message === userRecentlyChangedPassword)
          // Logout if user does not exist or recently changed password
          logout();

        if (message === userNotLoggedIn)
          // Logout if token is expired
          removeCookie();
      }
      return Promise.reject(error);
    }
  );
};
