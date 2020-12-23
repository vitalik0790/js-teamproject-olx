import '../node_modules/modern-normalize/modern-normalize.css';
//import { renderHeader } from './js/components/header';
import './styles.scss';

import { sliderGallery } from './js/components/sliderGallery';

import './js/components/hero';
import { isLogin } from './js/components/navigation-estimates';
//renderHeader();
import { testAuth } from './js/components/authentication';
isLogin();
testAuth();
