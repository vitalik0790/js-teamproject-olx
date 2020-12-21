import header from '../../templetes/header/header.hbs';

const fetchCategories = () => {
  return fetch(
    `https://callboard-backend.herokuapp.com/call/russian-categories`,
  ).then(response => {
    return response.json();
  });
};

export const renderHeader = () => {
  fetchCategories().then(data => {
    createMarkUp(data);
  });
};

const createMarkUp = categories => {
  const getUl = document.querySelector('.header-filter-list');
  let categoriesWrapper = { categories: categories };
  getUl.innerHTML += header(categoriesWrapper);

  // console.log('getHeader == >>', getUl);
  // console.log('categories == >>', categories);
  // console.log('categoriesWrapper == >>', categoriesWrapper);
};
