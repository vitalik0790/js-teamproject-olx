import { data } from "../data/data";

export const setFiltersListeners = () => {
    data.categories.forEach(category => {
        document.getElementById(category).addEventListener('click', selectCat);
        document.getElementById(category + 'Main').addEventListener('click', selectCat);
        document.getElementById(category + 'Tablet').addEventListener('click', selectCat);
    });    
};

const selectCat = (e) => {
    e.preventDefault();

    if(data.selectedCategory.length === 0) {
        document.getElementById(e.target.id).classList.add('selected');
        data.selectedCategory = e.target.id;
    } else {
        document.getElementById(data.selectedCategory).classList.remove('selected');
        document.getElementById(e.target.id).classList.add('selected');
        data.selectedCategory = e.target.id;

    }

    document.querySelector('.header-category-tablet').classList.remove("openCategory");
    document.querySelector('.js_menu').classList.remove("activ");
};
