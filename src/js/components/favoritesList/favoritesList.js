import { data } from '../../data/data';
import favoritesList from '../../../templates/favoritesList.hbs';
import { openProductInfo } from '../productInfo/productInfo';

const refs = {
  main: document.querySelector('.main'),
  favoritesList: '',
};

const favoritesBtnInHeaderRef = document.querySelector('.profile-menu span');
// console.log(favoritesBtnInHeaderRef);

function createMarkupFavoritesList() {
  const markup = favoritesList(data.user.favorites);
  console.log(data.user.favorites[0]._id);
  refs.main.innerHTML = markup;
  refs.favoritesList = document.querySelector('.favorites__list');
  refs.favoritesList.addEventListener('click', onCardClick);
}
function onCardClick(event) {
  if (event.target === event.currentTarget) return;
  console.log(event.target.dataset.card);
  console.log(event.target);
  // openProductInfo()
}

export { createMarkupFavoritesList };
