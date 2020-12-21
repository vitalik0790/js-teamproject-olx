import Siema from 'siema';
import productInfoTemplate from '../../templates/productInfoTemplate.hbs';
import { openInModal } from './modal';

openInModal(productInfoTemplate());
// const mySiema = new Siema();
// document.querySelector('.prev').addEventListener('click', () => mySiema.prev());
// document.querySelector('.next').addEventListener('click', () => mySiema.next());

const mySiema = new Siema();

// Add a function that generates pagination to prototype
Siema.prototype.addPagination = function () {
  for (let i = 0; i < this.innerElements.length; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.classList.add('dots__item');
    btn.addEventListener('click', () => this.goTo(i));
    this.selector.appendChild(btn);
  }
};

// Trigger pagination creator
mySiema.addPagination();
