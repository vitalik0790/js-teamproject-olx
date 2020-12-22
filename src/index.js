import '../node_modules/modern-normalize/modern-normalize.css';
//import { renderHeader } from './js/components/header';
import './styles.scss';

import './js/components/hero'
import { isLogin } from './js/components/navigation-estimates'
//renderHeader();
import { testAuth } from './js/components/authentication';
import { init} from './js/api/galleryApi'
init()
isLogin()
testAuth();
document.querySelector('.gallery__wrap').addEventListener('click', e => console.log(e.target))