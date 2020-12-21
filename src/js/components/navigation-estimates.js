import navigationEstimate from '../../templates/navigationSignIn.hbs'
import navSignUp from '../../templates/navigationSignUp.hbs'

const refs = {
    signInDiv: document.querySelector('.header-auth'),
}

export const isLogin = () => {
    if (!localStorage.getItem('accessToken')) {
        refs.signInDiv.insertAdjacentHTML('beforeend', `${navigationEstimate()}`)
    }
    else refs.signInDiv.insertAdjacentHTML('beforeend', `${navSignUp()}`)
}