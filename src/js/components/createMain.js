import mainTemplate from '../../templates/main.hbs';

export const createMain = () => {
  const main = document.querySelector('.main');
  main.innerHTML = mainTemplate();
};
