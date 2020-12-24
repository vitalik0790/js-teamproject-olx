import { data } from '../../data/data';
import favoritesList from '../../../templates/favoritesList.hbs';
import { openProductInfo } from '../productInfo/productInfo';

const refs = {
  main: document.querySelector('.main'),
  favoritesList: '',
};

// const favoritesBtnInHeaderRef = document.querySelector('.profile-menu span');

function createMarkupFavoritesList() {
  const markup = favoritesList(data.user.favorites);

  refs.main.innerHTML = markup;
  refs.favoritesList = document.querySelector('.favorites__list');
  refs.favoritesList.addEventListener('click', onCardClick);
}
function onCardClick(event) {
  if (event.target === event.currentTarget) return;

  const targetCard = data.user.favorites.find(
    card => card._id === event.target.dataset.card,
  );
  // console.log(targetCard);
  openProductInfo(targetCard);
}

export { createMarkupFavoritesList };
