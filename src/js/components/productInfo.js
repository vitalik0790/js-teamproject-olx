import Siema from 'siema';
import productInfoTemplate from '../../templates/productInfoTemplate.hbs';
import { openInModal } from './modal';
import axios from 'axios';
import { data } from '../data/data';

Siema.prototype.addPagination = function () {
  for (let i = 0; i < this.innerElements.length; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.classList.add('dots__item');
    btn.addEventListener('click', () => this.goTo(i));
    this.selector.appendChild(btn);
  }
};
const baseURL = 'https://callboard-backend.herokuapp.com';

// Выполняет запрос в базу данных
async function fetchCards() {
  const response = await axios.get(`${baseURL}/call/specific/electronics`);
  const cards = response.data;
  console.log(cards);

  return cards;
}

// Выполняет запрос за избранным
// async function fetchFavourites() {
//   const response = await axios.get(`${baseURL}/call/favourites`);
//   const cards = response;
//   console.log(cards);

//   return cards;
// }

fetchCards().then(cards => {
  openInModal(productInfoTemplate(cards[11]));
  const mySiema = new Siema();
  mySiema.addPagination();

  console.log(cards[11]);

  const maxImgRef = document.querySelector('.productInfo__imgMax');
  const minImgListRef = document.querySelector('.productInfo__list-imgMin');
  const minImgRef = document.querySelector('.productInfo__item-imgMin');
  maxImgRef.setAttribute('src', cards[11].imageUrls[0]);
  minImgRef.classList.add('productInfo__item-imgMin--active');

  minImgListRef.addEventListener('click', onMinImgClick);

  function onMinImgClick(event) {
    const currentActiveIMG = minImgListRef.querySelector(
      '.productInfo__item-imgMin--active',
    );

    switch (event.target.nodeName) {
      case 'UL':
        return;
      case 'LI':
        maxImgRef.setAttribute('src', event.target.dataset.url);

        console.log(currentActiveIMG);
        if (currentActiveIMG) {
          currentActiveIMG.classList.remove('productInfo__item-imgMin--active');
          event.target.classList.add('productInfo__item-imgMin--active');
        }
        break;
      default:
        maxImgRef.setAttribute('src', event.target.src);

        // console.log(currentActiveIMG);
        if (currentActiveIMG) {
          currentActiveIMG.classList.remove('productInfo__item-imgMin--active');
          const imgItem = event.target.closest('li');
          // console.log(imgItem);

          imgItem.classList.add('productInfo__item-imgMin--active');
        }
    }
  }

  addInFavorites(cards[11]);
});

// console.log(data.favorites);

fetchFavourites().then(cards => console.log(cards));

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
