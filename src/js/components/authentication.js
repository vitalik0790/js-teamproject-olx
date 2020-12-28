import axios from 'axios';
import { openInModal, closeModal, inCurrentModal } from './modal';
import signUpFormTemplate from '../../templates/signUpFormTemplate.hbs';
import signInFormTemplate from '../../templates/signInFormTemplate.hbs';
import { isLogin } from './navigation-estimates';
import { toggleMenuAuth } from './sandwichmenu';
import { fetchFavourites, fetchOwnCalls } from './productInfo/productInfo';
import { data } from '../data/data';
import { getToken } from '../utils/getToken';

const signUpURL = 'https://callboard-backend.herokuapp.com/auth/register';
const signInURL = 'https://callboard-backend.herokuapp.com/auth/login';

const user = {
  email: '',
  password: '',
};
const checkAuth = async () => {
  const token = await getToken();
  if (token) {
    data.auth.isAuth = true;
    data.auth.token = getToken();
  }
};
const logOut = () => {
  localStorage.clear();
  data.auth.isAuth = false;
  data.auth.token = '';
  data.user.favorites = [];
  data.user.ownCalls = [];
  isLogin();
  toggleMenuAuth('menuPane');
  // console.log('user logged out');
};

const signUpHandler = () => {
  if (document.querySelector('.backdrop').classList.contains('is-hidden')) {
    openInModal(signUpFormTemplate(), removeSignUpListeners);
  } else {
    inCurrentModal(signUpFormTemplate());
  }
  const errorUp = document.querySelector('.auth-form__errorUp');
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
      // console.log(response);
      // const data = { email: response.data.email };
      // console.log('data', data);
      const responseIn = await axios.post(signInURL, user);
      localStorage.setItem(
        'accessToken',
        JSON.stringify(responseIn.data.accessToken),
      );
      signUpForm.removeEventListener('input', getUserData);
      signUpForm.removeEventListener('submit', signUpData);
      data.auth.isAuth = true;
      data.auth.token = getToken();
      closeModal();
      isLogin();
      toggleMenuAuth('menuPane');
      fetchFavourites();
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      errorUp.textContent = error.response.data.message;
    }
  };
  const removeSignUpListeners = () => {
    signUpForm.removeEventListener('input', getUserData);
    signUpForm.removeEventListener('submit', signUpData);
  };
  const signUpData = e => {
    e.preventDefault();
    signUp(user).then(resetUser)//.then(console.log('user signed in'));
  };
  signUpForm.addEventListener('input', getUserData);
  signUpForm.addEventListener('submit', signUpData);
};

const signInHandler = () => {
  openInModal(signInFormTemplate(), removeSignInListeners);
  const errorIn = document.querySelector('.auth-form__errorIn');
  const signInForm = document.forms.signInForm;
  const signInFormSignUpBtn = document.querySelector(
    '.auth-form__signInFormSignUpBtn',
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
      data.auth.isAuth = true;
      data.auth.token = getToken();
      closeModal();
      isLogin();
      toggleMenuAuth('menuPane');
      fetchFavourites();
      fetchOwnCalls();
    } catch (error) {
      console.log(error.response.data.message);
      errorIn.textContent = error.response.data.message;
    }
  };
  const signInData = async e => {
    e.preventDefault();
    signIn(user).then(resetUser)//.then(console.log('user signed in'));
  };
  const removeSignInListeners = () => {
    signInForm.removeEventListener('input', getUserData);
    signInForm.removeEventListener('submit', signInData);
    signInFormSignUpBtn.removeEventListener('click', signUpHandler);
  };

  signInForm.addEventListener('input', getUserData);
  signInForm.addEventListener('submit', signInData);
  signInFormSignUpBtn.addEventListener('click', signUpHandler);
};

export { signUpHandler, signInHandler, logOut, checkAuth };
