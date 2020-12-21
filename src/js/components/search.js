import { data } from '../data/data'

const headerInput = document.querySelector('.header-logo__input');
const headerInputTablet = document.querySelector('.header-logo__input-tablet');

const showValue = (e) => {
    const query = e.target.value;
}

headerInput.addEventListener('input', showValue)
headerInputTablet.addEventListener('input', showValue)

const inputSearch = 