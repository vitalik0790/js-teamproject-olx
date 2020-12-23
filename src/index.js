import '../node_modules/modern-normalize/modern-normalize.css';
//import { renderHeader } from './js/components/header';
import './styles.scss';
import { isLogin } from './js/components/navigation-estimates';
//renderHeader();
// import { testAuth } from './js/components/authentication';
isLogin();
// testAuth();

import { sliderGallery } from './js/components/sliderGallery';
// sliderGallery();
// =========================================================
// const prev = document.getElementById('btn-prev'),
//   next = document.getElementById('btn-next'),
//   slides = document.querySelectorAll('.slide'),
//   dots = document.querySelectorAll('.dot'),
//   slidesWrapper = document.querySelector('.js-slider');

// let index = 0;

// console.log(dots);

// // const activeSlide = n => {
// //   for (slide of slides) {
// //     slide.classList.remove('active');
// //   }
// //   slides[n].classList.add('active');
// // };
// const activeDot = n => {
//   console.log(n);
//   for (dot of dots) {
//     dot.classList.remove('active');
//   }
//   dots[n].classList.add('active');
// };

// const nextSlide = () => {
//   if (index == slides.length - 1) {
//     index = 0;
//     // activeSlide(index);
//     activeDot(index);
//   } else {
//     index += 1;
//     // activeSlide(index);
//     activeDot(index);
//   }
// };

// const prevSlide = () => {
//   if (index == 0) {
//     index = slides.length - 1;
//     activeDot(index);
//     // activeSlide(index);
//   } else {
//     index -= 1;
//     activeDot(index);
//     // activeSlide(index);
//   }
// };

// next.addEventListener('click', nextSlide);
// prev.addEventListener('click', prevSlide);
