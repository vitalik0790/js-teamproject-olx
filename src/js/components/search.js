import { data } from '../data/data'
import searchCard from '../../templates/search.hbs'
import { searchInCategory, search } from '../api/searchInCategory'
import { searchInAll } from '../api/searchInAll'

const headerInput = document.querySelector('.header-logo__input');
const headerInputTablet = document.querySelector('.header-logo__input-tablet');
const main = document.querySelector('.main')

export const getSearchQuery = async (query) => {
    if (data.categories.length) {
        if (data.categories.some(item => item.includes(query))) {
            await searchInCategory(data.categories.find(item => item.includes(query)));
            return data.inCategories;
        } else {
            await searchInAll(query);
            return data.inAll;
        }
    } else return;
}

export const updateMarkup = (goods) => {
    main.innerHTML = `<div class="container"><ul class="search-gallery">${searchCard(goods)}</ul></div>`;
}

// let inputValue = '';
// export const getBySearch = (event) => {
//     // event.preventDefault();
//     main.innerHTML = '';
//     inputValue = event.target.value;
//     // console.log(inputValue);

//     if (inputValue.length >= 1) {
//         getSearchQuery(inputValue)
//             .then(goods => {
//                 updateMarkup(goods)
//             })
//     }
// }

export const onPressEnterSearch = async event => {
    if (event.code === 'Enter') {
        if (headerInput.value.length >= 1 || headerInputTablet.value.length >= 1) {
            updateMarkup(await getSearchQuery(headerInput.value));
            headerInput.value = '';
        }
    };
}

// headerInput.addEventListener('change', getBySearch);
// headerInputTablet.addEventListener('change', getBySearch);
headerInput.addEventListener('keydown', onPressEnterSearch);
headerInputTablet.addEventListener('keydown', onPressEnterSearch);









