import '../node_modules/modern-normalize/modern-normalize.css';
//import { renderHeader } from './js/components/header';
import './styles.scss';
import { refs, openAdvModal } from './js/components/newAdvForm';
import { createMain } from './js/components/createMain';
// const addButton = document.querySelector('form-input-file');
// content.innerHTML = listMarkup();
// addButton.addEventListener('click', addImage)
import { data } from './js/data/data';
import { sliderGallery } from './js/components/sliderGallery';
import { checkAuth } from './js/components/authentication';
import { createHero } from './hero_template';
import { isLogin } from './js/components/navigation-estimates';
import {
  fetchFavourites,
  fetchOwnCalls,
} from './js/components/productInfo/productInfo';
import { filterListener } from './js/api/filterSearch';
import { clearFilterListener } from './js/components/clearBtn';

import { newAdvMobileListener } from './js/components/newAdvButton';
import { filterMainListener } from './js/components/filter-tablet';
import { createCategoryMarkup } from './js/components/filter-tablet';
import { setFiltersListeners } from './js/components/setFiltersListeners';
import { renderJsMenu } from './js/components/sandwichmenu';
import { renderHeader } from './js/components/header';

import './js/components/footer/footer';
import './js/components/students-modal/students-modal';

import { init } from './js/api/galleryApi';
const initialisation = async () => {
  await createMain();
  await createHero();
  await init();
  await isLogin();
  await checkAuth();
  await createCategoryMarkup();
  await renderHeader();
  if (data.auth.isAuth === true) {
    await fetchFavourites();
    await fetchOwnCalls();
  }
  await renderJsMenu();
  filterListener();
  clearFilterListener();
  newAdvMobileListener();
  filterMainListener();

  setFiltersListeners();
};
initialisation();

import { newAdv } from './js/components/newAdvButton';
// import hero_template from './hero_template';

import './js/components/search';
import mobileSearh from './js/components/header-mob-search';
import './js/components/clearBtn';
