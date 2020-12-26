import { getToken } from '../utils/getToken';
import { signUpHandler} from './authentication';
import { openAdvModal } from './newAdvForm';

const newAdvbutton = document.getElementById('header-btn-adv');

export const newAdv = () => {
    if (!getToken()) {
        signUpHandler();
    } else {
        openAdvModal();
    }
};

newAdvbutton.addEventListener('click', newAdv);

export const newAdvMobileListener = () => {
    const newAdvbuttonMobile = document.querySelector('.gallery__modal-btn');
    newAdvbuttonMobile.addEventListener('click', newAdv);
}