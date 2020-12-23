import axios from 'axios';

export const profileMenu = () => {
  const menu = document.querySelector('.profile-menu');
  menu.classList.toggle('is-hidden');
};

// const closeMenu = event => {
//   menu.classList.add('is-hidden');
//   if (event.target !== event.currentTarget) {
//   }
// };

// menu.addEventListener('click', closeMenu);
