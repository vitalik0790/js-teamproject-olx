import { data } from '../data/data';
import { selectCategory } from './selectCategory';
 
export const renderFilter = () => {
    //console.log(data.russianCategories);
    //renderCategories(data.russianCategories);
    data.russianCategories.forEach(category => {
    document.getElementById(category).addEventListener('click', selectCategory);
     
    });
};

//   const clearCategories = () =>{
//     document.querySelector('.header-filter-list').innerHTML = '';
//   }

// const renderCategories = (categories) => {
//     clearCategories(refs);
//     categories.forEach(category => { 
//         document.querySelector('.header-filter-list').innerHTML += `
//       <li class="filter__list-item" >
//         <button class="filter__list-item_btn" id="${category}" data-filter="">
//           ${category}
//         </button>
//       </li>
//       `; 
//     });
//   }