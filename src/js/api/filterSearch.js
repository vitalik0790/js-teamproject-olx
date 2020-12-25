import { searchInCategory } from './searchInCategory';
import { data } from '../data/data';
import { updateMarkup } from '../components/search';

export const filterListener = () => {
    const filterList = document.querySelector('.header-filter-list');
    filterList.addEventListener('click', filterSearch); 
}

const filterSearch = async e => {
    if (e.target.nodeName === "BUTTON") {
        await searchInCategory(e.target.dataset.filter);
        updateMarkup(data.inCategories);
    }
}

