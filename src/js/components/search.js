import { data } from '../data/data'
import searchCard from '../../templates/search.hbs'
import { searchInCategory, search } from '../api/searchInCategory'
import { searchInAll } from '../api/searchInAll'

const headerInput = document.querySelector('.header-logo__input');
const headerInputTablet = document.querySelector('.header-logo__input-tablet');
const main = document.querySelector('.main')

export const getSearchQuery = (query) => {
    if (data.categories.length) {
        if (data.categories.some(item => item.includes(query))) {
            searchInCategory(data.categories.find(item => item.includes(query)));
            return data.inCategories;
        } else {
            searchInAll(query);
            return data.inAll;
        }
    } else return;
}

export const updateMarkup = (goods) => {
    console.log(goods);
    let searchMarkup = searchCard(goods);
    console.log(searchMarkup);
    main.innerHTML = `<div class="container"><ul class="search-gallery">${searchMarkup}</ul></div>`;
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

export const onPressEnterSearch = event => {
    if (event.code === 'Enter') {
        if (headerInput.value.length >= 1 || headerInputTablet.value.length >= 1) {
            updateMarkup(getSearchQuery(headerInput.value));
            headerInput.value = '';
        }
    };
}




// headerInput.addEventListener('change', getBySearch);
// headerInputTablet.addEventListener('change', getBySearch);
headerInput.addEventListener('keydown', onPressEnterSearch);
headerInputTablet.addEventListener('keydown', onPressEnterSearch);









