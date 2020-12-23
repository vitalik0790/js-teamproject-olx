import sandwichmenu from '../../templates/sandwichMenu.hbs';
import { clearFilter } from '../api/searchInCategory';
import signInMenuPane from '../../templates/navigationSignInMenuPane.hbs';
import signUpMenuPane from '../../templates/navigationSignUpMenuPane.hbs';
import { signUpHandler, signInHandler, logOut } from './authentication';

export const func = (e) => {
  e.preventDefault();
  getJsMenu.classList.toggle("activ");
}

const createMarkUp = () => {
  getJsMenu.insertAdjacentHTML('beforeend', `${sandwichmenu()}`);
  //const categorisFilterTabl = document.getElementById('header-filter-tablet');
  const categorisFilter = document.getElementById('categorisFilter');
  const clearFilterBtn = document.getElementById('clearFilter');
  //categorisFilterTabl.addEventListener('click', renderFilter);
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
  if (!localStorage.getItem('accessToken')) {
    signInDivMenuPane.innerHTML = signInMenuPane(context);
      const signInBtnmenu = document.getElementById(paneName + 'SignInBtnId')
      const signUpBtnmenu = document.getElementById(paneName + 'SignUpBtnId')
      if (signUpBtnmenu.addEventListener('click', signUpHandler)) {
          signUpBtnmenu.removeEventListener('click', signUpHandler)
      } if (signInBtnmenu.addEventListener('click', signInHandler)) {
          signInBtnmenu.removeEventListener('click', signInHandler)
      }
  }
  else {
    signInDivMenuPane.innerHTML = signUpMenuPane(context)
      const logOutBtnmenu = document.getElementById(paneName + 'LogOutBtn')
      // const userBtnmenu = document.querySelector(paneName + 'User_btn')
      if (logOutBtnmenu.addEventListener('click', logOut)) {
          logOutBtnmenu.removeEventListener('click', logOut)
      }
  }
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

