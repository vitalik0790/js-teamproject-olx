import navigationEstimate from '../../templates/navigationSignIn.hbs'
import navSignUp from '../../templates/navigationSignUp.hbs'
// import { signInHandler, signUpHandler, logOut } from './js/components/authentication'
const refs = {
    signInDiv: document.querySelector('.auth-test-btns2'),
}

export const isLogin = () => {
    if (!localStorage.getItem('accessToken')) {
        refs.signInDiv.insertAdjacentHTML('beforeend', `${navigationEstimate()}`)
    }
    else refs.signInDiv.insertAdjacentHTML('beforeend', `${navSignUp()}`)
}