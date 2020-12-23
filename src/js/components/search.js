import { data } from '../data/data'
import { search } from '../api/searchInCategory'
import searchCard from '../../templates/search.hbs'

const nameAllCategories = [
    "property",
    "transport",
    "work",
    "electronics",
    "business and services",
    "recreation and sport",
    "free",
    "trade"
]

const headerInput = document.querySelector('.header-logo__input');
const headerInputTablet = document.querySelector('.header-logo__input-tablet');
const main = document.querySelector('.main')



export const getSearchQuery = (query) => {
    return fetch(`${data.baseURL}/call/find?search=${query}`)
        .then(response => response.json())
}


// const getSearchCategory = (category) => {
//     if (data.categories[category].length) {
//         return data.categories
//     } else {

//         return fetch(`${data.baseURL}/call/specific/${category}`)
//             .then(res => res.json())
//     }
// };


export const updateMarkup = (goods) => {
    const searchMarkup = searchCard(goods);
    // searchGallery.insertAdjacentHTML('beforeend', searchMarkup)
    main.innerHTML = `<div class="container"><ul class="search-gallery">${searchMarkup}</ul></div>`;

}

let inputValue = '';

export const getBySearch = (event) => {
    event.preventDefault();
    main.innerHTML = '';
    inputValue = event.target.value;
    // console.log(inputValue);

    if (inputValue.length >= 1) {
        getSearchQuery(inputValue)
            .then(goods => {
                updateMarkup(goods)
            })
    }
}

export const onPressEnterSearch = event => {
    if (event.code === 'Enter') {
        if (headerInput.value.length >= 1 && headerInputTablet.value.length >= 1) {
            getSearchQuery(inputValue)
                .then(goods => {
                    updateMarkup(goods);
                })
                .catch(error => console.log(error));
        }
        inputValue = '';
    }
};




headerInput.addEventListener('change', getBySearch);
headerInputTablet.addEventListener('change', getBySearch);
document.addEventListener('keydown', onPressEnterSearch);









