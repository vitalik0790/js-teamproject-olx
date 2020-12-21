import { data } from '../data/data'
import searchCard from '../../templates/search.hbs'
// import axios from 'axios';


const headerInput = document.querySelector('.header-logo__input');
const headerInputTablet = document.querySelector('.header-logo__input-tablet');
const searchGallery = document.querySelector('.search-gallery')
// console.dir(headerInput);

export const getSearchQuery = (query) => {
    return fetch(`${data.baseURL}/call/find?search=${query}`)
        .then(response => response.json())
        .then(data => data);
};

export const updateMarkup = (goods) => {
    const searchMarkup = searchCard(goods);
    // searchGallery.insertAdjacentHTML('beforeend', searchMarkup)
    searchGallery.innerHTML = searchMarkup;
}

let inputValue = '';

const getBySearch = (event) => {
    event.preventDefault();
    searchGallery.innerHTML = '';
    inputValue = event.target.value;
    // console.log(inputValue);

    if (inputValue.length >= 1) {
        getSearchQuery(inputValue)
            .then(goods => {
                updateMarkup(goods)
            })
    }
}


headerInput.addEventListener('input', getBySearch);
headerInputTablet.addEventListener('input', getBySearch);









