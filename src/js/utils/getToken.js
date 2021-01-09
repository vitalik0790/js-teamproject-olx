import { data } from "../data/data";

export const getToken = () => {
  // if (localStorage.getItem('accessToken')) {
  //   return JSON.parse(localStorage.getItem('accessToken'));
  // }
  return data.auth.accessToken;
};
