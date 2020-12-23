import { openInModal } from '../modal';
import { data } from '../../data/data';
import { mobSlider } from './productInfoSlider';
import productInfoTemplate from '../../../templates/productInfoTemplate.hbs';
import {
  fetchFavouritesAPI,
  addInFavoritesAPI,
  removeFromFavoritesAPI,
} from './favoritesAPI';

const refs = {
  dotsRef: '',
  activeListRef: '',
  maxImgRef: '',
  minImgListRef: '',
  minImgRef: '',

  favoritesRef: '',
  favoritesIconRef: '',
  favoritesTextRef: '',
};

// Выполняет запрос в базу данных

// async function fetchCards() {
//   const response = await axios.get(`${data.baseURL}/call/specific/electronics`);
//   const cards = response.data;
//   console.log(cards);

//   return cards;
// }
// fetchCards().then(cards => openProductInfo(cards[11]));

//=============== открытие информации о товаре =================
function openProductInfo(card) {
  const price = card.price.toLocaleString();
  openInModal(productInfoTemplate({ ...card, price }), removeEventListeners);

  refs.dotsRef = document.querySelector('.dots');
  refs.activeListRef = document.querySelector('.productInfo__action-list');
  refs.maxImgRef = document.querySelector('.productInfo__imgMax');
  refs.minImgListRef = document.querySelector('.productInfo__list-imgMin');
  refs.minImgRef = document.querySelector('.productInfo__item-imgMin');
  refs.favoritesRef = document.querySelector('.favorites-js');
  refs.favoritesIconRef = refs.favoritesRef.querySelector('svg');
  refs.favoritesTextRef = refs.favoritesRef.querySelector('span');

  mobSlider(refs.dotsRef);
  isAuth(refs.activeListRef);

  fetchFavouritesAPI()
    .then(favorites => {
      data.user.favorites = favorites;
      console.log('data после перезагрузки:', data.user.favorites);

      if (findCardInFavoritesById(card)) {
        changeFavoriteBtnOnActive();
      }
    })
    .catch(error => console.log(error));

  refs.maxImgRef.setAttribute('src', card.imageUrls[0]);
  refs.minImgRef.classList.add('productInfo__item-imgMin--active');

  refs.minImgListRef.addEventListener('click', onMinImgClick);
  refs.favoritesRef.addEventListener('click', onFavoritesClick.bind(card));
}

function onMinImgClick(event) {
  if (event.target.nodeName === 'UL') return;
  if (event.target.nodeName === 'LI') {
    refs.maxImgRef.setAttribute('src', event.target.dataset.url);
    changeAciveIMG(event.target);
    return;
  }

  refs.maxImgRef.setAttribute('src', event.target.src);
  const imgItem = event.target.closest('li');

  changeAciveIMG(imgItem);
}

function changeAciveIMG(nextActiveIMG) {
  const currentActiveIMG = refs.minImgListRef.querySelector(
    '.productInfo__item-imgMin--active',
  );
  if (currentActiveIMG) {
    currentActiveIMG.classList.remove('productInfo__item-imgMin--active');
    nextActiveIMG.classList.add('productInfo__item-imgMin--active');
  }
}

function onFavoritesClick() {
  if (!findCardInFavoritesById(this)) {
    addInFavoritesAPI(this._id, this)
      .then(response => {
        data.user.favorites = [...data.user.favorites, this];
        changeFavoriteBtnOnActive();

        console.log('data после добавления:', data.user.favorites);
      })
      .catch(error => console.log(error));
    return;
  }

  const idx = data.user.favorites.indexOf(findCardInFavoritesById(this));

  removeFromFavoritesAPI(this._id)
    .then(response => {
      data.user.favorites.splice(idx, 1);
      changeFavoriteBtnOnInactive();
      console.log('data после удаления:', data.user.favorites);
    })
    .catch(error => console.log(error));
}

function changeFavoriteBtnOnActive() {
  refs.favoritesTextRef.textContent = 'В избранном';
  refs.favoritesRef.classList.add('productInfo__action-item--active');
  refs.favoritesIconRef.classList.add(
    'productInfo__action-item--favorite-icon--active',
  );
}

function changeFavoriteBtnOnInactive() {
  refs.favoritesTextRef.textContent = 'В избранное';
  refs.favoritesRef.classList.remove('productInfo__action-item--active');
  refs.favoritesIconRef.classList.remove(
    'productInfo__action-item--favorite-icon--active',
  );
}

function findCardInFavoritesById(card) {
  const targetCard = data.user.favorites.find(item => item._id === card._id);
  return targetCard;
}

function isAuth(activeListRef) {
  if (data.auth.isAuth) {
    activeListRef.classList.add('productInfo__action-list--isAuth');
  }
}

function removeEventListeners() {
  refs.minImgListRef.removeEventListener('click', onMinImgClick);
  refs.favoritesRef.removeEventListener('click', onFavoritesClick);
}

export { openProductInfo };
