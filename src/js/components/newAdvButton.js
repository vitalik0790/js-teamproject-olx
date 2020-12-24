import { getToken } from '../utils/getToken';
import { signUpHandler} from './authentication';
import { openAdvModal } from './newAdvForm';

const newAdvbutton = document.getElementById('header-btn-adv');

export const newAdv = () => {
    console.log('Hi');
    if (!getToken()) {
        signUpHandler();
    } else {
        openAdvModal();
    }
};

newAdvbutton.addEventListener('click', newAdv);