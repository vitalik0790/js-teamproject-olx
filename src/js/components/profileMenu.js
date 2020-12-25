// import axios from 'axios';
import { data } from '../data/data';
import { createMarkupFavoritesGoodsList } from '../components/favorites-myGoodsList/favorites-myGoodsList';

const refs = {
  menu: '',
  profileMenu: '',
  favoritesBtnInHeaderRef: '',
  myGoodsBtnInHeaderRef: '',
  main: document.querySelector('.main'),
};

export const profileMenu = () => {
  refs.menu = document.querySelector('.profile-menu');
  refs.profileMenu = document.querySelector('.profile-menu');
  refs.profileMenu.addEventListener('click', onProfileMenuClick);
  refs.favoritesBtnInHeaderRef = document.querySelector(
    '.profile-menu__favorites',
  );
  refs.myGoodsBtnInHeaderRef = document.querySelector('.profile-menu__name');

  refs.menu.classList.toggle('is-hidden');
};

function onProfileMenuClick(event) {
  if (event.target === refs.favoritesBtnInHeaderRef) {
    console.log('Избранное в data:', data.user.favorites);
    createMarkupFavoritesGoodsList('Избранное', data.user.favorites);
    refs.profileMenu.removeEventListener('click', onProfileMenuClick);
    refs.menu.classList.toggle('is-hidden');
    return;
  }
  if (event.target === refs.myGoodsBtnInHeaderRef) {
    console.log('Мои объявления в data:', data.user.ownCalls);
    console.log(data.user.ownCalls);
    createMarkupFavoritesGoodsList('Мои объявления', data.user.ownCalls);
    refs.profileMenu.removeEventListener('click', onProfileMenuClick);
    refs.menu.classList.toggle('is-hidden');
    return;
  }
  return;
}

// const closeMenu = event => {
//   menu.classList.add('is-hidden');
//   if (event.target !== event.currentTarget) {
//   }
// };

// menu.addEventListener('click', closeMenu);
