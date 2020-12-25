import sandwichmenu from '../../templates/sandwichMenu.hbs';
import { clearFilter } from '../api/searchInCategory';
import signInMenuPane from '../../templates/navigationSignInMenuPane.hbs';
import { signUpHandler, signInHandler, logOut } from './authentication';
import { renderFilter } from './search-mobile';
import { getToken } from '../utils/getToken';

//********************* 
//Открывает панель категорий
const func = (e) => {
  e.preventDefault();
  refs.getJsMenu.classList.toggle("activ");
  setAuthMenuListeners("menuPane");
}

//переключает вид меню авторизации логин/сайнап
export const toggleMenuAuth = (panelId) => {
  document.getElementById(panelId + 'SignUpWrapperId').classList.toggle("element_hidden");
  document.getElementById(panelId + 'SignInWrapperId').classList.toggle("element_hidden");
} 

//отрисовывает панель категорий внутри элемента с классом .js_menu
export const createMarkUp = () => {
  refs.getJsMenu.insertAdjacentHTML('beforeend', `${sandwichmenu()}`);
  //const categorisFilterTabl = document.getElementById('header-filter-tablet');
  const categorisFilter = document.getElementById('categorisFilter');
  const clearFilterBtn = document.getElementById('clearFilter');
  //categorisFilterTabl.addEventListener('click', renderFilter);
  categorisFilter.addEventListener('click', function(){renderFilter(refs)});
  clearFilterBtn.addEventListener('click', clearFilter);
};

//отрисовывает меню авторизации внутри div mobile-auth
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

//развешивает листенеров по элементам на панели
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


//код исполняющийся при загрузке страницы

//const getUl = document.getElementById('categoriesList');
let refs = {
  isCategoriesShown : false,
  selectedCategory : '',
  getUl : '',
  getJsMenu : document.querySelector('.js_menu'),
}

const sandwichMenu = document.getElementById('sandwichmenu');
//const getJsMenu = document.querySelector('.js_menu');
const getSvgMenu = document.getElementById('svgMenu');

createMarkUp();
refs.getUl = document.getElementById('categoriesList');
console.log("markup created");




const signInDivMenuPane = document.getElementById('mobile-auth');

sandwichMenu.addEventListener('click', func); 
getSvgMenu.addEventListener('click', func);

renderAuthMenu("menuPane");

