import { data } from '../data/data';

console.log(data);
export const filterMainListener = () => {
    const getFilter = document.getElementById('mainFilterSelector');
    //const getDivWithUl = document.querySelector('.header-category-tablet');
    
    getFilter.addEventListener('click', openDiv);
    
};


const openDiv = () => {
    const getDivWithUl = document.querySelector('.header-category-tablet');
    getDivWithUl.classList.toggle('openCategory');
  
}

export const createCategoryMarkup = () => {
    data.categories.forEach(category => { 
        const index = data.categories.indexOf(category)
        document.getElementById('categoryTablet').innerHTML += `
        <li class="filter__list-item" >
          <button class="filter__list-item_btn" id="${category}Tablet" data-filter="${data.originalCategories[index]}">
            ${ data.russianCategories[index]}
          </button>
        </li>
        `; 
      });
};

