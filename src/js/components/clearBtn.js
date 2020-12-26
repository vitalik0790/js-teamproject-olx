import { clearFilter } from '../api/searchInCategory';
import { createMain } from './createMain';
import { createHero } from '../../hero_template';
import { init } from '../api/galleryApi';
import { data } from '../data/data';

const clearMain = () => {
    clearFilter();
    createMain();
    createHero();
    init();
    clearSelectedFilter();
};

const clearSelectedFilter = () => {
    data.russianCategories.forEach(category => {
        document.getElementById(category).classList.remove('selected');
    });
}

export const clearFilterListener= () => {
    const clearBtnMobile = document.getElementById('clearFilter');
    const clearBtn = document.getElementById('clear-filter-btn');
    clearBtnMobile.addEventListener('click', clearMain);
    clearBtn.addEventListener('click', clearMain);
};