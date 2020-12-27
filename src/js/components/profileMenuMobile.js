// import axios from 'axios';
import { data } from '../data/data';
import { createMarkupFavoritesGoodsList } from '../components/favorites-myGoodsList/favorites-myGoodsList';

const refs = {
  menuMobil: '',
  menuFavorites: '',
  menuMyAdv: '',
  getJsMenu: document.querySelector('.js_menu'),
  main: document.querySelector('.main'),
};

export const profileMenuMobile = () => {
  refs.menuMobil = document.querySelector('.profile-menuMobil');
  refs.menuFavorites = document.getElementById('profile-menuMobil-favorite');
  refs.menuMyAdv = document.getElementById('profile-menuMobil-MyAdv');
  refs.menuFavorites.addEventListener('click', buttonClick);
  refs.menuMyAdv.addEventListener('click', buttonClick);
  refs.menuMobil.classList.toggle('mobil-hidden');
};

const buttonClick = e => {
  if (e.target === refs.menuFavorites) {
    createMarkupFavoritesGoodsList('Избранное', data.user.favorites);
    refs.menuFavorites.removeEventListener('click', buttonClick);
    refs.getJsMenu.classList.toggle('activ');
    refs.menuFavorites.classList.toggle('is-mobil-hidden');
    refs.menuMobil.classList.toggle('mobil-hidden');

    console.log('Избранное в data:', data.user.favorites);
  }
  if (e.target === refs.menuMyAdv) {
    createMarkupFavoritesGoodsList('Мои объявления', data.user.ownCalls);
    refs.menuMyAdv.removeEventListener('click', buttonClick);
    refs.getJsMenu.classList.toggle('activ');
    refs.btnInCardRef = document.querySelectorAll('.myGoods-btn');
    refs.btnInCardRef.forEach(btn => btn.classList.add('myGoods-btn--active'));
    refs.menuMyAdv.classList.toggle('is-mobil-hidden');
    refs.menuMobil.classList.toggle('mobil-hidden');

    console.log('Мои объявления в data:', data.user.ownCalls);
  }
  return;
};
