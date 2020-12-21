export const getToken = () => {
  if (localStorage.getItem('accessToken')) {
    return localStorage.getItem('accessToken');
  }
};
