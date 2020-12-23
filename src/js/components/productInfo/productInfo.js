import { mobSlider } from './productInfoSlider';
import productInfoTemplate from '../../../templates/productInfoTemplate.hbs';
import { openInModal } from '../modal';
import axios from 'axios';
import { data } from '../../data/data';

const baseURL = 'https://callboard-backend.herokuapp.com';

// Выполняет запрос в базу данных
async function fetchCards() {
  const response = await axios.get(`${baseURL}/call/specific/electronics`);
  const cards = response.data;
  console.log(cards);

  return cards;
}
fetchCards().then(cards => openProductInfo(cards[15]));

//=============== открытие информации о товаре =================
export function openProductInfo(card) {
  const price = card.price.toLocaleString();
  openInModal(productInfoTemplate({ ...card, price }), removeEventListeners);
  console.log(card.price.toLocaleString());

  const dotsRef = document.querySelector('.dots');
  mobSlider(dotsRef);

  const maxImgRef = document.querySelector('.productInfo__imgMax');
  const minImgListRef = document.querySelector('.productInfo__list-imgMin');
  const minImgRef = document.querySelector('.productInfo__item-imgMin');

  maxImgRef.setAttribute('src', card.imageUrls[0]);
  minImgRef.classList.add('productInfo__item-imgMin--active');

  minImgListRef.addEventListener('click', onMinImgClick);

  function onMinImgClick(event) {
    if (event.target.nodeName === 'UL') return;
    if (event.target.nodeName === 'LI') {
      maxImgRef.setAttribute('src', event.target.dataset.url);

      changeAciveIMG(event.target);
      return;
    }

    maxImgRef.setAttribute('src', event.target.src);
    const imgItem = event.target.closest('li');

    changeAciveIMG(imgItem);
  }

  function changeAciveIMG(nextActiveIMG) {
    const currentActiveIMG = minImgListRef.querySelector(
      '.productInfo__item-imgMin--active',
    );
    if (currentActiveIMG) {
      currentActiveIMG.classList.remove('productInfo__item-imgMin--active');
      nextActiveIMG.classList.add('productInfo__item-imgMin--active');
    }
  }

  function removeEventListeners() {
    minImgListRef.removeEventListener('click', onMinImgClick);
  }

  // addInFavorites(cards[11]);
}
// console.log(data.favorites);

// fetchFavourites().then(cards => console.log(cards));

// Добавляет товар в избранное
function addInFavorites(card) {
  const favoritesRef = document.querySelector('.favorites-js');
  favoritesRef.addEventListener('click', onFavoritesClick);

  function onFavoritesClick() {
    console.log(data.favorites);
    if (!data.favorites.includes(card)) {
      data.favorites = [...data.favorites, card];
      console.log(data.favorites);
    }
    const idx = data.favorites.indexOf(card);
    data.favorites.splice(idx, 1);
    console.log(data.favorites);
  }
}
