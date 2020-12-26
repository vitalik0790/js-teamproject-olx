import { data } from '../data/data';
import { selectCategory } from './selectCategory';
 
export const renderFilterMobile = (refs) => {
    if (!refs.isCategoriesShown) {
        renderCategories(data.categories, refs);
        //console.log(data);
        data.categories.forEach(category => {
            console.log(category);
          document.getElementById(category).addEventListener('click', selectCategory);
          document.getElementById(category).addEventListener('click', function(){refs.getJsMenu.classList.toggle("activ");})
        });
      refs.isCategoriesShown = true;
    } else {
      clearCategories(refs);
      refs.isCategoriesShown = false;
    }
  };
  
const clearCategories = (refs) =>{
    refs.getUl.innerHTML = '';
  }
  
const renderCategories = (categories, refs) => {
    clearCategories(refs);
    categories.forEach(category => { 
      const index = data.categories.indexOf(category)
        refs.getUl.innerHTML += `
      <li class="filter__list-item" >
        <button class="filter__list-item_btn" id="${category}">
          ${ data.russianCategories[index]}
        </button>
      </li>
      `; 
    });
  };