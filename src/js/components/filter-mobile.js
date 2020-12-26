import { data } from '../data/data';
import { selectCategory } from './selectCategory';
import { clearFilter } from '../api/searchInCategory';
 
// export const renderFilterMobile = () => {
//     if (!data.isCategoriesShown) {
//         renderCategories(data.categories);
//        data.categories.forEach(category => {
//           document.getElementById(category).addEventListener('click', selectCategory);
//         });
//       data.isCategoriesShown = true;
//     } else {
//       clearCategories();
//       data.isCategoriesShown = false;
//     }
//   };

export const showCategoriesMobile = () => {
  console.log("showCategoriesMobile");
  // data.categories.forEach(category => {
  //   document.getElementById(category).addEventListener('click', selectCategory);
  // });
  //document.getElementById('categoriesList').classList.toggle('element_hidden');
  //data.isCategoriesShown = true;
  //if (document.getElementById('categoriesList').classList.contains('element_hidden')){
    document.getElementById('categoriesList').classList.remove('element_hidden');
  //} 
}
  
export const clearCategories = () =>{
  console.log("clearCategories");
  clearFilter();
  //TODO remove selection
  if (!document.getElementById('categoriesList').classList.contains('element_hidden')){
    document.getElementById('categoriesList').classList.add('element_hidden');
  }  
}
  
export const renderCategories = () => {
    data.categories.forEach(category => { 
      const index = data.categories.indexOf(category)
      document.getElementById('categoriesList').innerHTML += `
      <li class="filter__list-item" >
        <button class="filter__list-item_btn" id="${category}">
          ${ data.russianCategories[index]}
        </button>
      </li>
      `; 
    });
  };