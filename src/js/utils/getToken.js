export const getToken = () => {
  if (localStorage.getItem('accessToken')) {
    return JSON.parse(localStorage.getItem('accessToken'));
  }
};
