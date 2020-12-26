import { data } from '../data/data';

import filterMenu from '../../templates/filterMenu.hbs'

export const filterMainListener = () => {
    const getFilter = document.getElementById('mainFilterSelector');
    const getDivWithUl = document.querySelector('.header-category-tablet');
    
    getFilter.addEventListener('click', openDiv);
    // console.log(getFilter);
    // console.log(getDivWithUl);
    // console.log(getFilterTablet);
};


const openDiv = () => {
    const getDivWithUl = document.querySelector('.header-category-tablet');
    getDivWithUl.classList.toggle('openCategory');
    
    // console.log("object");
    // console.log(getDivWithUl);
}

export const createCategoryMarkup = () => {
    const getFilterTablet = document.getElementById('categoryTablet');
    // console.log(getFilterTablet);
    let tabletCtegories = {categories: data.russianCategories};
    getFilterTablet.innerHTML = filterMenu(tabletCtegories);
};

