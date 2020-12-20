import axios from 'axios';
import { openInModal, closeModal } from './modal';
import signUpFormTemplate from '../../templates/signUpFormTemplate.hbs';
import signInFormTemplate from '../../templates/signInFormTemplate.hbs';

const signUpBtn = document.querySelector('.signUpBtn');
const signInBtn = document.querySelector('.signInBtn');
const logOutBtn = document.querySelector('.logOutBtn');

const signUpURL = 'https://callboard-backend.herokuapp.com/auth/register';
const signInURL = 'https://callboard-backend.herokuapp.com/auth/login';

const user = {
  email: '',
  password: '',
};

const logOut = () => {
  localStorage.clear();
  console.log('user logged out');
};

const signUpHandler = () => {
  openInModal(signUpFormTemplate());
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
      closeModal();
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

signUpBtn.addEventListener('click', signUpHandler);
signInBtn.addEventListener('click', signInHandler);
logOutBtn.addEventListener('click', logOut);
