import sandwichmenu from '../../templates/sandwichMenu.hbs';
import signInMenuPane from '../../templates/navigationSignInMenuPane.hbs';
import { signUpHandler, signInHandler, logOut } from './authentication';
import { clearCategories, renderCategories, showCategoriesMobile } from './filter-mobile';
import { getToken } from '../utils/getToken';
import { confirmModal } from './confirmModal';
import { data } from '../data/data';

//********************* 
//Открывает панель категорий
const func = (e) => {
  e.preventDefault();
  document.querySelector('.js_menu').classList.toggle("activ");
  //setAuthMenuListeners("menuPane");
}

//переключает вид меню авторизации логин/сайнап
export const toggleMenuAuth = (panelId) => {
  document.getElementById(panelId + 'SignUpWrapperId').classList.toggle("element_hidden");
  document.getElementById(panelId + 'SignInWrapperId').classList.toggle("element_hidden");
} 

//отрисовывает панель категорий внутри элемента с классом .js_menu
// export const createMarkUp = () => {
//   refs.getJsMenu.insertAdjacentHTML('beforeend', `${sandwichmenu()}`);
//   const categorisFilter = document.getElementById('categorisFilter');
//   const clearFilterBtn = document.getElementById('clearFilter');
//   categorisFilter.addEventListener('click', function(){renderFilterMobile(refs)});
//   clearFilterBtn.addEventListener('click', clearFilter);
// };

//отрисовывает меню авторизации внутри div mobile-auth
export const renderAuthMenu = (paneName) => {
  const context = { menuAuth: paneName };
  document.getElementById('mobile-auth').innerHTML = signInMenuPane(context);
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

//развешивает листенеров по элементам на панели аутентикации
const setAuthMenuListeners = (paneName) => {
  const signInBtnmenu = document.getElementById(paneName + 'SignInBtnId')
  const signUpBtnmenu = document.getElementById(paneName + 'SignUpBtnId')
  const logOutBtnmenu = document.getElementById(paneName + 'LogOutBtn')
  const userBtnmenu = document.getElementById(paneName + 'User_btn')
  signUpBtnmenu.addEventListener('click', signUpHandler);
  signInBtnmenu.addEventListener('click', signInHandler);
  logOutBtnmenu.addEventListener('click', confirmModal);
  userBtnmenu.addEventListener('click', () => {
    const menuMobil = document.querySelector('.profile-menuMobil');
    menuMobil.classList.toggle('mobil-hidden');
  });
}

const setJsPaneListeners = () => {
  const sandwichMenu = document.getElementById('sandwichmenu');
  const getSvgMenu = document.getElementById('svgMenu');  
  const categorisFilter = document.getElementById('categorisFilter');
  const clearFilterBtn = document.getElementById('clearFilter');

  categorisFilter.addEventListener('click', showCategoriesMobile);
  clearFilterBtn.addEventListener('click', clearCategories);
  sandwichMenu.addEventListener('click', func); 
  getSvgMenu.addEventListener('click', func);
}

export const renderJsMenu = async () => {
  // let refs = {
  //   getUl : '',
  //   getJsMenu : document.querySelector('.js_menu'),
  // }
  await document.querySelector('.js_menu').insertAdjacentHTML('beforeend', `${sandwichmenu()}`);
  await renderAuthMenu("menuPane");
  await renderCategories();
  setJsPaneListeners();
  setAuthMenuListeners("menuPane");

}
