import axios from 'axios';
import { data } from '../../data/data';
import { getToken } from '../../utils/getToken';

// axios.defaults.headers.common['Authorization'] = `Bearer ${data.auth.token}`;

export const fetchFavouritesAPI = async () => {
  try {
    const token = getToken();
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${data.baseURL}/call/favourites`;
    const response = await axios.get(url, options);

    const favorites = response.data.favourites;

    // console.log('избранное в базе', favorites);

    return favorites;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOwnCallsAPI = async () => {
  try {
    const token = getToken();
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${data.baseURL}/call/own`;
    const response = await axios.get(url, options);

    const ownCalls = response.data.favourites;

    // console.log('Мои обьявления в базе', ownCalls);

    return ownCalls;
  } catch (error) {
    console.log(error);
  }
};

export const addInFavoritesAPI = async (id, card) => {
  try {
    const token = getToken();
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${data.baseURL}/call/favourite/${id}`;
    const response = await axios.post(url, card, options);

    const newFavourites = response.data.newFavourites;
    console.log('Новая карточка добавлена в базу, в базе:', newFavourites);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const removeFromFavoritesAPI = async id => {
  try {
    const token = getToken();
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${data.baseURL}/call/favourite/${id}`;
    const response = await axios.delete(url, options);

    const newFavourites = response.data.newFavourites;
    console.log('Новая карточка удалена из базы, в базе:', newFavourites);

    return newFavourites;
  } catch (error) {
    console.log(error);
  }
};
