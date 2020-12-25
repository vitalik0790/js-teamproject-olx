import { data } from '../../data/data';
import listTemplate from '../../../templates/favorites-myGoodsList.hbs';
import { openProductInfo } from '../productInfo/productInfo';

const refs = {
  main: document.querySelector('.main'),
  list: '',
};

function createMarkupFavoritesGoodsList(title, arr) {
  if (!arr.length) {
    refs.main.innerHTML = `<section class="favorites-myGoods container">
  <h1 class="favorites-myGoods__title">${title}</h1>
  </section>`;
    return;
  }

  const markup = listTemplate({ ...arr, title });

  refs.main.innerHTML = markup;
  refs.list = document.querySelector('.favorites-myGoods__list');
  refs.list.addEventListener('click', onCardClick);

  function onCardClick(event) {
    if (event.target === event.currentTarget) return;

    const targetCard = arr.find(
      card => card._id === event.target.closest(`li[data-card]`).dataset.card,
    );
    // console.log(targetCard);
    openProductInfo(targetCard);
  }
}

export { createMarkupFavoritesGoodsList };
