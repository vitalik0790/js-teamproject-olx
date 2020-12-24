// import axios from 'axios';
import { data } from '../data/data';
import favoritesList from '../../templates/favoritesList.hbs';

const refs = {
  menu: '',
  favoritesBtnInHeaderRef: '',
  main: document.querySelector('.main'),
};

export const profileMenu = () => {
  refs.menu = document.querySelector('.profile-menu');
  refs.favoritesBtnInHeaderRef = document.querySelector(
    '.profile-menu__favorites',
  );
  refs.menu.classList.toggle('is-hidden');
  refs.favoritesBtnInHeaderRef.addEventListener('click', onFavoritBtnClock);
};

function onFavoritBtnClock() {
  console.log(data.user.favorites);

  const markup = favoritesList(data.user.favorites);
  refs.main.innerHTML = markup;
  refs.menu.classList.toggle('is-hidden');
}

// const closeMenu = event => {
//   menu.classList.add('is-hidden');
//   if (event.target !== event.currentTarget) {
//   }
// };

// menu.addEventListener('click', closeMenu);
