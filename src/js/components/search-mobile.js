import { data } from '../data/data';
 
export const renderFilter = (menuPaneStatusObj) => {
    
    if (!menuPaneStatusObj.isCategoriesShown) {
        renderCategories(data.russianCategories, menuPaneStatusObj);
        console.log(data);
        data.russianCategories.forEach(category => {
            console.log(menuPaneStatusObj);
          document.getElementById(category).addEventListener('click', function(e){selectCategory(e,menuPaneStatusObj)});
          document.getElementById(category).addEventListener('click', function(){menuPaneStatusObj.getJsMenu.classList.toggle("activ");})
        });
      menuPaneStatusObj.isCategoriesShown = true;
    } else {
      clearCategories(menuPaneStatusObj);
      menuPaneStatusObj.isCategoriesShown = false;
    }
  };
  
const clearCategories = (menuPaneStatusObj) =>{
    menuPaneStatusObj.getUl.innerHTML = '';
  }
  
const selectCategory = (e, menuPaneStatusObj) => {
    e.preventDefault();
    if (menuPaneStatusObj.selectedCategory.length === 0) {
      document.getElementById(e.target.id).classList.add('selected');
      menuPaneStatusObj.selectedCategory = e.target.id;
    } else {
      document.getElementById(menuPaneStatusObj.selectedCategory).classList.remove('selected');
      document.getElementById(e.target.id).classList.add('selected');
      menuPaneStatusObj.selectedCategory = e.target.id;
    }
  }
  
const renderCategories = (categories, menuPaneStatusObj) => {
    clearCategories(menuPaneStatusObj);
    categories.forEach(category => { 
        menuPaneStatusObj.getUl.innerHTML += `
      <li class="filter__list-item" >
        <button class="filter__list-item_btn" id="${category}">
          ${category}
        </button>
      </li>
      `; 
    });
  };