import Siema from 'siema';
import productInfoTemplate from '../../templates/productInfoTemplate.hbs';
import { openInModal } from './modal';
import axios from 'axios';

// function fetchCards() {}
// axios
//   .get('https://callboard-backend.herokuapp.com/call/specific/electronics')
//   .then(cards => console.log(cards));

openInModal(productInfoTemplate());
const mySiema = new Siema();
// document.querySelector('.prev').addEventListener('click', () => mySiema.prev());
// document.querySelector('.next').addEventListener('click', () => mySiema.next());

Siema.prototype.addPagination = function () {
  for (let i = 0; i < this.innerElements.length; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.classList.add('dots__item');
    btn.addEventListener('click', () => this.goTo(i));
    this.selector.appendChild(btn);
  }
};

mySiema.addPagination();
