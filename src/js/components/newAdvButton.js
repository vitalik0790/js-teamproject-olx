//==============================================
// Элемент вызывает событие открытия модального окна создания объявления.
// Создать объявление может только зарегистрированный пользователь.
// В противном случае, при клике на кнопку реализовано перенаправление на форму регистрации
import {getToken} from '../utils/getToken';
import { openInModal, closeModal, inCurrentModal } from './modal';
import signUpFormTemplate from '../../templates/signUpFormTemplate.hbs';
import {
  signUpHandler,
  signInHandler,
  logOut,
  testAuth,
} from './authentication';
const newAdvbutton = document.querySelector('.header-btn-adv');


export const newAdv = () => {
    if (localStorage.getItem('accessToken')) {
        //signUpHandler();
        console.log('Hello');
    } else {
        console.log('Good bye');
    }
    
    

    

};

newAdvbutton.addEventListener('click', newAdv);


