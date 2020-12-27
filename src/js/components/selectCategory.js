import { data } from '../data/data';

export const selectCategory = (e) => {
    e.preventDefault();
    if (data.selectedCategory.length === 0) {
      document.getElementById(e.target.id).classList.add('selected');
      data.selectedCategory = e.target.id;
      
      console.log(e.target.id);
      //console.log(data.selectedCategory);
    } else {
      document.getElementById(data.selectedCategory).classList.remove('selected');
      document.getElementById(e.target.id).classList.add('selected');
      data.selectedCategory = e.target.id;
    };
    document.querySelector('.js_menu').classList.toggle("activ");
  }