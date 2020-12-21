import { data } from '../data/data'

const headerInput = document.querySelector('.header-logo__input');
const headerInputTablet = document.querySelector('.header-logo__input-tablet');

let query = "";

const showValue = (e) => {
    query = e.target.value;
    console.log(query);
}

headerInput.addEventListener('input', showValue)
headerInputTablet.addEventListener('input', showValue)

const fetchGoods = (query) => {
    const URL = `${BASE_URL}/call`;
    return fetch(URL)
        .then(response => response.json())
        .then(data => {
            return data;
        })

}






