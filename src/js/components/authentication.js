import axios from 'axios';
import { openInModal, closeModal, inCurrentModal } from './modal';
import signUpFormTemplate from '../../templates/signUpFormTemplate.hbs';
import signInFormTemplate from '../../templates/signInFormTemplate.hbs';
import {isLogin} from './navigation-estimates'

const signUpURL = 'https://callboard-backend.herokuapp.com/auth/register';
const signInURL = 'https://callboard-backend.herokuapp.com/auth/login';

const user = {
  email: '',
  password: '',
};

const logOut = () => {
  localStorage.clear();
  isLogin();
  console.log('user logged out');
};

const signUpHandler = () => {
  if (document.querySelector('.backdrop').classList.contains('is-hidden')) {
    openInModal(signUpFormTemplate());
  } else {
    inCurrentModal(signUpFormTemplate());    
  }
  const errorUp = document.querySelector('.form__errorUp');
  const signUpForm = document.forms.signUpForm;
  const resetUser = () => {
    user.email = '';
    user.password = '';
    signUpForm.reset();
  };
  const getUserData = e => {
    errorUp.textContent = '';
    const { name, value } = e.target;
    user[name] = value;
  };
  const signUp = async user => {
    try {
      const response = await axios.post(signUpURL, user);
      console.log(response);
      const data = { email: response.data.email };
      console.log('data', data);
      signUpForm.removeEventListener('input', getUserData);
      signUpForm.removeEventListener('submit', signUpData);
      closeModal();
    } catch (error) {
      console.log(error.response.data.message);
      errorUp.textContent = error.response.data.message;
    }
  };
  const signUpData = e => {
    e.preventDefault();
    signUp(user).then(resetUser);
  };
  signUpForm.addEventListener('input', getUserData);
  signUpForm.addEventListener('submit', signUpData);
};

const signInHandler = () => {
  openInModal(signInFormTemplate());
  const errorIn = document.querySelector('.form__errorIn');
  const signInForm = document.forms.signInForm;
  const signInFormSignUpBtn = document.querySelector(
    '.form__signInFormSignUpBtn',
  );
  const resetUser = () => {
    user.email = '';
    user.password = '';
    signInForm.reset();
  };
  const getUserData = e => {
    errorIn.textContent = '';
    const { name, value } = e.target;
    user[name] = value;
  };
  
  const signIn = async user => {
    try {
      const response = await axios.post(signInURL, user);
      localStorage.setItem(
        'accessToken',
        JSON.stringify(response.data.accessToken),
      );
      signInForm.removeEventListener('input', getUserData);
      signInForm.removeEventListener('submit', signInData);
      signInFormSignUpBtn.removeEventListener('click', signUpHandler);
      closeModal();
      isLogin();
    } catch (error) {
      console.log(error.response.data.message);
      errorIn.textContent = error.response.data.message;
    }
  };
  const signInData = async e => {
    e.preventDefault();
    signIn(user).then(resetUser).then(console.log('user signed in'));
  };

  signInForm.addEventListener('input', getUserData);
  signInForm.addEventListener('submit', signInData);
  signInFormSignUpBtn.addEventListener('click', signUpHandler);
};
const testAuth = () => {
  const signUpBtn = document.querySelectorAll('.signUpBtn');
  const signInBtn = document.querySelectorAll('.signInBtn');
  const logOutBtn = document.querySelectorAll('.logOutBtn');
  signUpBtn.forEach(element => element.addEventListener('click', signUpHandler));
  signInBtn.forEach(element => element.addEventListener('click', signInHandler));
  logOutBtn.forEach(element => element.addEventListener('click', logOut));  
};
export { signUpHandler, signInHandler, logOut, testAuth };
// export { signUpHandler, signInHandler, logOut };
