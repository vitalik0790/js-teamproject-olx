import { clearFilter } from '../api/searchInCategory';
import { createMain } from './createMain';
import { createHero } from '../../hero_template';
import { init } from '../api/galleryApi';

const clearBtn = document.getElementById('clear-filter-btn');

const clearMain = () => {
    clearFilter();
    createMain();
    createHero();
    init()
};

clearBtn.addEventListener('click', clearMain);

export const clearFilterListener= () => {
    const clearBtnMobile = document.getElementById('clearFilter');
    clearBtnMobile.addEventListener('click', clearMain)
};