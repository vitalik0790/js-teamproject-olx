import sandwichmenu from '../../templates/sandwichMenu.hbs';
import { clearFilter } from '../api/searchInCategory';
import signInMenuPane from '../../templates/navigationSignInMenuPane.hbs';
import { signUpHandler, signInHandler, logOut } from './authentication';
import { getToken } from '../utils/getToken';

const func = (e) => {
  e.preventDefault();
  getJsMenu.classList.toggle("activ");
  setAuthMenuListeners("menuPane");

}
export const toggleMenuAuth = (panelId) => {
  document.getElementById(panelId + 'SignUpWrapperId').classList.toggle("element_hidden");
  document.getElementById(panelId + 'SignInWrapperId').classList.toggle("element_hidden");
} 

const createMarkUp = () => {
  getJsMenu.insertAdjacentHTML('beforeend', `${sandwichmenu()}`);
  const categorisFilter = document.getElementById('categorisFilter');
  const clearFilterBtn = document.getElementById('clearFilter');
  categorisFilter.addEventListener('click', renderFilter);
  clearFilterBtn.addEventListener('click', clearFilter);
};

const fetchCategories = () => {
  return fetch(
    `https://callboard-backend.herokuapp.com/call/russian-categories`,
  ).then(response => {
    return response.json();
  });
};

export const renderFilter = () => {
  if (!isCategoriesShown) {
    fetchCategories().then(data => {
      renderCategories(data);
      data.forEach(category => {
        document.getElementById(category).addEventListener('click', selectCategory);
      });
    });
    isCategoriesShown = true;
  } else {
    clearCategories();
    isCategoriesShown = false;
  }
};
const clearCategories = () =>{
    getUl.innerHTML = '';
}

const selectCategory = (e) => {
  e.preventDefault();
  if (selectedCategory.length === 0) {
    document.getElementById(e.target.id).classList.add('selected');
    selectedCategory = e.target.id;
  } else {
    document.getElementById(selectedCategory).classList.remove('selected');
    document.getElementById(e.target.id).classList.add('selected');
    selectedCategory = e.target.id;
  }
}

const renderCategories = categories => {
  clearCategories();
  categories.forEach(category => { 
    getUl.innerHTML += `
    <li class="filter__list-item" >
      <button class="filter__list-item_btn" id="${category}">
        ${category}
      </button>
    </li>
    `; 
  });
};

export const renderAuthMenu = (paneName) => {
  const context = { menuAuth: paneName };
  signInDivMenuPane.innerHTML = signInMenuPane(context);
  const signUpWrappemenu = document.getElementById(paneName + 'SignUpWrapperId');
    const signInWrappemenu = document.getElementById(paneName + 'SignInWrapperId');
  if (getToken()) {
    signUpWrappemenu.classList.remove('element_hidden');
    signInWrappemenu.classList.add('element_hidden');
  } else {
    signInWrappemenu.classList.remove('element_hidden');
    signUpWrappemenu.classList.add('element_hidden');
  }
}

const setAuthMenuListeners = (paneName) => {
  const signInBtnmenu = document.getElementById(paneName + 'SignInBtnId')
  const signUpBtnmenu = document.getElementById(paneName + 'SignUpBtnId')
  const logOutBtnmenu = document.getElementById(paneName + 'LogOutBtn')
  const userBtnmenu = document.getElementById(paneName + 'User_btn')
  signUpBtnmenu.addEventListener('click', signUpHandler);
  signInBtnmenu.addEventListener('click', signInHandler);
  logOutBtnmenu.addEventListener('click', logOut);
  userBtnmenu.addEventListener('click', () => {
    const menuMobil = document.querySelector('.profile-menuMobil');
    menuMobil.classList.toggle('mobil-hidden');
  });
}

const sandwichMenu = document.getElementById('sandwichmenu');
const getJsMenu = document.querySelector('.js_menu');
const getSvgMenu = document.getElementById('svgMenu');
let isCategoriesShown = false;
let selectedCategory = '';

createMarkUp();

const getUl = document.getElementById('categoriesList');
const signInDivMenuPane = document.getElementById('mobile-auth');

sandwichMenu.addEventListener('click', func); 
getSvgMenu.addEventListener('click', func);
renderAuthMenu("menuPane");

