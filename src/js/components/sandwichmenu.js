import sandwichmenu from '../../templates/sandwichMenu.hbs';
import { clearFilter } from '../api/searchInCategory';

const sandwichMenu = document.getElementById('sandwichmenu');
const getJsMenu = document.querySelector('.js_menu');
const getSvgMenu = document.getElementById('svgMenu');


export const func = (e) => {
  e.preventDefault();
  getJsMenu.classList.toggle("activ");
}

const createMarkUp = () => {
  getJsMenu.insertAdjacentHTML('beforeend', `${sandwichmenu()}`);
  const categorisFilter = document.getElementById('categorisFilter');
  const clearFilterBtn = document.getElementById('clearFilter');
  categorisFilter.addEventListener('click', renderFilter);
  clearFilterBtn.addEventListener('click', clearFilter)
};

const fetchCategories = () => {
  return fetch(
    `https://callboard-backend.herokuapp.com/call/russian-categories`,
  ).then(response => {
    return response.json();
  });
};

export const renderFilter = () => {
  fetchCategories().then(data => {
    renderCategories(data);
  });
};

const renderCategories = categories => {
  const getUl = document.getElementById('categoriesList');
  getUl.innerHTML = '';
  categories.forEach(category => { 
    getUl.innerHTML += `<li>${category}</li>`;
  });
};

createMarkUp();

sandwichMenu.addEventListener('click', func); 
getSvgMenu.addEventListener('click', func);