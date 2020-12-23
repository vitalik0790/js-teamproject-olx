import sandwichmenu from '../../templates/sandwichMenu.hbs';
//import { isLogin } from '../components/navigation-estimates';

const sandwichMenu = document.getElementById('sandwichmenu');
const getJsMenu = document.querySelector('.js_menu');



export const func = (e) => {
  e.preventDefault();
  
  sandwichMenu.classList.toggle("activ");
  getJsMenu.classList.toggle("activ");
  createMarkUp();
  
}

const createMarkUp = () => {
  getJsMenu.insertAdjacentHTML('beforeend', `${sandwichmenu()}`);

};

sandwichMenu.addEventListener('click', func); 
getJsMenu.addEventListener('click', func);


//document.querySelector('.mobil-menu').innerHTML = '';

// const getScreen = () => {
//   if (window.screen.width >= 320 && window.screen.width <=767) {
//     data.properties.isMobile = true;
//     console.log(data);
//   }
// };

// if (data.properties.isMobile) {
//   getJsMenu.insertAdjacentHTML('beforeend', `${sandwichmenu()}`);
// }