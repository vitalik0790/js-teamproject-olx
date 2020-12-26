import { getToken } from '../utils/getToken';
import { signUpHandler } from './authentication';
import { newAdvFormComponent } from './newAdvForm';
import { openInModal } from './modal';
import newAdvForm from '../../templates/newAdvForm.hbs';
import { data } from '../data/data';

const newAdvbutton = document.getElementById('header-btn-adv');
console.log(newAdvForm());
export const newAdv = () => {
    if (!getToken()) {
        signUpHandler();
    } else {
        openInModal(newAdvForm());
        newAdvFormComponent();
    }
};

newAdvbutton.addEventListener('click', newAdv);

export const newAdvMobileListener = () => {
    const newAdvbuttonMobile = document.querySelector('.gallery__modal-btn');
    newAdvbuttonMobile.addEventListener('click', newAdv);
}