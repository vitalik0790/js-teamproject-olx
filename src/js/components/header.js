import { data } from '../data/data'; 

export const renderHeader = () => {
    data.categories.forEach(category => { 
      const index = data.categories.indexOf(category)
      document.getElementById('categoriesListMain').innerHTML += `
      <li class="list header-filter-list__item" >
        <button class="button header-filter-list__item-btn" id="${category}Main" data-filter="${data.originalCategories[index]}">
          ${ data.russianCategories[index]}
        </button>
      </li>
      `; 
    });
  };