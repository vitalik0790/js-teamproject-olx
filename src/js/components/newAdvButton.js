import { getToken } from '../utils/getToken';
import { openInModal, closeModal, inCurrentModal } from './modal';
import signUpFormTemplate from '../../templates/signUpFormTemplate.hbs';
import { signUpHandler} from './authentication';

const newAdvbutton = document.querySelector('.header-btn-adv');

export const newAdv = () => {
    if (!getToken()) {
        signUpHandler();
        //console.log('Hello');
    } else {
        console.log('Good bye');
    }
};

newAdvbutton.addEventListener('click', newAdv);