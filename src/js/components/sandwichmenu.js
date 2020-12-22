import sandwichmenu from '../../templates/sandwichMenu.hbs';
import { isLogin } from '../components/navigation-estimates';

  const sandwichMenu = document.getElementById('sandwichmenu');
  const getDivMenu = document.querySelector('.js_menu');

export const func = (e) => {
  e.preventDefault();
  sandwichMenu.classList.toggle("activ");
  getDivMenu.classList.toggle("activ");
}
const fetchCategories = () => {
  return fetch(
    `https://callboard-backend.herokuapp.com/call/russian-categories`,
  ).then(response => {
    return response.json();
  });
};

export const renderMenu = () => {
  fetchCategories().then(data => {
    createMarkUp(data);
    isLogin();
  });
  
};

const createMarkUp = categories => {
  let categoriesWrapper = { categories: categories };
  getDivMenu.innerHTML += sandwichmenu(categoriesWrapper);
  
};
sandwichMenu.addEventListener('click', func); 
getDivMenu.addEventListener('click', func);