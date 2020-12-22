import '../node_modules/modern-normalize/modern-normalize.css';
//import { renderHeader } from './js/components/header';
import './styles.scss';
import { isLogin } from './js/components/navigation-estimates'
//renderHeader();

import { testAuth } from './js/components/authentication';
import './js/components/productInfo';

testAuth();

// import { testAuth } from './js/components/authentication';
isLogin()
// testAuth();

