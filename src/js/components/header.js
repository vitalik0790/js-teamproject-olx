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
  const getHeader = document.getElementById('header');
  let categoriesWrapper = { categories: categories };
  getHeader.innerHTML += header(categoriesWrapper);

  console.log('getHeader == >>', getHeader);
  console.log('categories == >>', categories);
  console.log('categoriesWrapper == >>', categoriesWrapper);
};
