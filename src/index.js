import '../node_modules/modern-normalize/modern-normalize.css';
//import { renderHeader } from './js/components/header';
import './styles.scss';

import { refs, openAdvModal } from './js/components/newAdvForm';




// const addButton = document.querySelector('form-input-file');
// content.innerHTML = listMarkup();
// addButton.addEventListener('click', addImage)

import { sliderGallery } from './js/components/sliderGallery';

import './js/components/hero';
import { isLogin } from './js/components/navigation-estimates';
//renderHeader();

import { init} from './js/api/galleryApi'
init()
document.querySelector('.gallery__wrap').addEventListener('click', e => console.log(e.target))








isLogin()


import { sandwichmenu } from './js/components/sandwichmenu';


