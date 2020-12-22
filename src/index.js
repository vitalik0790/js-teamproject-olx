import '../node_modules/modern-normalize/modern-normalize.css';
//import { renderHeader } from './js/components/header';
import './styles.scss';

import './js/components/hero'
import { isLogin } from './js/components/navigation-estimates'
//renderHeader();
import { testAuth } from './js/components/authentication';
isLogin()
testAuth();
import './js/components/footer/footer'
import './js/components/students-modal/students-modal'