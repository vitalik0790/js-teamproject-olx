import navigationEstimate from '../../templates/navigationSignIn.hbs';
import navSignUp from '../../templates/navigationSignUp.hbs';
import { signUpHandler, signInHandler, logOut } from './authentication';
import profileMenuTemplate from '../../templates/profileMenu.hbs';
import { profileMenu } from './profileMenu';
import confirmModalTemplate from '../../templates/confirmModal.hbs';

const refs = {
  signInDiv: document.querySelector('.header-auth'),
};

export const isLogin = () => {
  if (!localStorage.getItem('accessToken')) {
    refs.signInDiv.innerHTML = `${navigationEstimate()}`;
    const signInBtn = document.querySelector('.signInBtn');
    const signUpBtn = document.querySelector('.signUpBtn');
    if (signUpBtn.addEventListener('click', signUpHandler)) {
      signUpBtn.removeEventListener('click', signUpHandler);
    }
    if (signInBtn.addEventListener('click', signInHandler)) {
      signInBtn.removeEventListener('click', signInHandler);
    }
  } else {
    refs.signInDiv.innerHTML = `${navSignUp()}${profileMenuTemplate()}${confirmModalTemplate()}`;
    const logOutBtn = document.querySelector('.logOutBtn');
    const userBtn = document.querySelector('.user_btn');
    if (logOutBtn.addEventListener('click', logOut)) {
      logOutBtn.removeEventListener('click', logOut);
    }
    if (userBtn.addEventListener('click', profileMenu)) {
      userBtn.removeEventListener('click', profileMenu);
    }
  }
};
