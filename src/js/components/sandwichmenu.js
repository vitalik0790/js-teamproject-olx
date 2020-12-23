import sandwichmenu from '../../templates/sandwichMenu.hbs';
import { clearFilter } from '../api/searchInCategory';

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

const sandwichMenu = document.getElementById('sandwichmenu');
const getJsMenu = document.querySelector('.js_menu');
const getSvgMenu = document.getElementById('svgMenu');
let isCategoriesShown = false;
let selectedCategory = '';

createMarkUp();

const getUl = document.getElementById('categoriesList');

sandwichMenu.addEventListener('click', func); 
getSvgMenu.addEventListener('click', func);