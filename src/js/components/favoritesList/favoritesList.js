import { data } from '../../data/data';
import favoritesList from '../../../templates/favoritesList.hbs';
const refs = {
  main: document.querySelector('.main'),
};

const favoritesBtnInHeaderRef = document.querySelector('.profile-menu span');
console.log(favoritesBtnInHeaderRef);

function createMarkupFavoritesList() {
  //   const markup = favoritesList(data.user.favorites);
  //   refs.main.innerHTML = markup;
}
export { createMarkupFavoritesList };
