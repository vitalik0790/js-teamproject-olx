import { data } from '../../data/data';
import listTemplate from '../../../templates/favorites-myGoodsList.hbs';
import { openProductInfo } from '../productInfo/productInfo';

const refs = {
  main: document.querySelector('.main'),
  list: '',
};

function createMarkupFavoritesGoodsList(title, arr) {
  // if (!arr.length) {
  //   refs.main.innerHTML = `<section class="favorites-myGoods container">
  // <h1 class="favorites-myGoods__title">${title}</h1>
  // </section>`;
  //   return;
  // }

  const markup = listTemplate({ arr, title });
  refs.main.innerHTML = markup;

  refs.list = document.querySelector('.favorites-myGoods__list');
  refs.list.addEventListener('click', onCardClick);

  function onCardClick(event) {
    if (event.target === event.currentTarget) return;

    if (event.target.nodeName === 'BUTTON') {
      console.log(findTargetCard());
      return;
    }

    // console.log(targetCard);
    openProductInfo(findTargetCard());

    function findTargetCard() {
      const targetCard = arr.find(
        card => card._id === event.target.closest(`li[data-card]`).dataset.card,
      );
      return targetCard;
    }
  }
}

export { createMarkupFavoritesGoodsList };
