import { data } from '../data/data'; 

export const showCategoriesMobile = () => {
    document.getElementById('categoriesList').classList.remove('element_hidden');
}
  
export const renderCategories = () => {
    data.categories.forEach(category => { 
      const index = data.categories.indexOf(category)
      document.getElementById('categoriesList').innerHTML += `
      <li class="filter__list-item" >
        <button class="filter__list-item_btn" id="${category}" data-filter="${data.originalCategories[index]}">
          ${ data.russianCategories[index]}
        </button>
      </li>
      `; 
    });
  };