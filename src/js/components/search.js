import { data } from '../data/data';
import searchCard from '../../templates/search.hbs';
import { searchInCategory } from '../api/searchInCategory';
import { searchInAll } from '../api/searchInAll';
import { openProductInfo } from '../components/productInfo/productInfo';

const headerInput = document.querySelector('.header-logo__input');
const headerInputTablet = document.querySelector('.header-logo__input-tablet');
const headerInputMob = document.querySelector('.mobile-search-input');
const main = document.querySelector('.main');
const searchDesIcon = document.querySelector('.header-search__btn');
const searchTabIcon = document.querySelector('.header__input-btn');
console.dir(searchDesIcon);

export const getSearchQuery = async query => {
  if (data.categories.length) {
    if (data.categories.some(item => item.includes(query))) {
      await searchInCategory(
        data.categories.find(item => item.includes(query)),
      );
      return data.inCategories;
    } else {
      await searchInAll(query);
      return data.inAll;
    }
  } else return;
};

export const updateMarkup = goods => {
  main.innerHTML = `<div class="container"><ul class="search-gallery">${searchCard(
    goods,
  )}</ul></div>`;

  // ================= открытие ProductInfo по клику на карточку ======
  const searchGalleryRef = document.querySelector('.search-gallery');
  searchGalleryRef.addEventListener('click', onCardClickInSearch);

  function onCardClickInSearch(event) {
    if (event.target === event.currentTarget) return;

    const currentCategory = event.target.closest('li').dataset.category;
    const targetCard = data.categoriesList[currentCategory].find(
      card => card._id === event.target.closest('li').dataset.id,
    );
    // console.log(targetCard);
    openProductInfo(targetCard);
  }
};

export const onPressEnterSearch = async event => {
  if (event.code === 'Enter') {
    if (headerInput.value.length >= 1) {
      updateMarkup(await getSearchQuery(headerInput.value));
      headerInput.value = '';
    }

    if (headerInputTablet.value.length >= 1) {
      updateMarkup(await getSearchQuery(headerInputTablet.value));
      headerInputTablet.value = '';
    }

    if (headerInputMob.value.length >= 1) {
      updateMarkup(await getSearchQuery(headerInputMob.value));
      headerInputMob.value = '';
    }
  }
};

export const onPressSearchIcon = async event => {
  if (headerInput.value.length >= 1) {
    updateMarkup(await getSearchQuery(headerInput.value));
    headerInput.value = '';
  }

  if (headerInputTablet.value.length >= 1) {
    updateMarkup(await getSearchQuery(headerInputTablet.value));
    headerInputTablet.value = '';
  }

  if (headerInputMob.value.length >= 1) {
    updateMarkup(await getSearchQuery(headerInputMob.value));
    headerInputMob.value = '';
  }
};

headerInput.addEventListener('keydown', onPressEnterSearch);
headerInputTablet.addEventListener('keydown', onPressEnterSearch);
headerInputMob.addEventListener('keydown', onPressEnterSearch);

searchDesIcon.addEventListener('click', onPressSearchIcon);
searchTabIcon.addEventListener('click', onPressSearchIcon);
