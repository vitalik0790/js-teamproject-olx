import { searchInCategory } from './searchInCategory';
import { data } from '../data/data';
import { updateMarkup } from '../components/search';

export const filterListener = () => {
    const filterList = document.querySelector('.header-filter-list');
    const filterListTablet = document.querySelector('.header-category-tablet-list');
    const filterListMobile = document.querySelector('.filter__list');
    filterList.addEventListener('click', filterSearch); 
    filterListTablet.addEventListener('click', filterSearch);
    filterListMobile.addEventListener('click', filterSearch);
}

const filterSearch = async e => {
    if (e.target.nodeName === "BUTTON") {
        await searchInCategory(e.target.dataset.filter);
        updateMarkup(data.inCategories);
    }
}

