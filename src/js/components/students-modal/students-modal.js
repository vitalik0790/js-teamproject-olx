import './students-modal.css';
//  import '../../../scss/_modal.scss'
import {openInModal} from '../modal';
// import {closeModal} from '../modal';
import studentsModal from '../../../templates/students-modal.hbs';


// const studentsCloseBtn = document.querySelector('.modal-close');
const footerBtn = document.querySelector('.button-students');
// console.log(studentsCloseBtn);
 const StudentTemplate = studentsModal()

 const forModal = () => {
      openInModal(studentsModal())
   
 } 
 footerBtn.addEventListener('click', forModal);


// export const modalBackDrop = innerElement => {
//     const body = document.querySelector('body');
//     const container = document.querySelector('.modal');
//     const createModalMarkup = closeModal => {
//       return `(СЮДИ Я ПРОПИСАВ РОЗМІТКУ `;
//     };
//     const closeModal = () => {
//       container.classList.remove('show-modal');
//       container.addEventListener('click', close);
//       document.removeEventListener('keydown', close);
//       body.style.overflow = 'unset';
//     };
//     const close = e => {
//       if (e.target === document.querySelector('.modal') || e.key === 'Escape') {
//         closeModal();
//       } else return;
//     };
//     container.innerHTML = createModalMarkup(closeModal);
//     container.classList.add('show-modal', 'transition-effect');
//     body.style.overflow = 'hidden';
//     container.addEventListener('click', close);
//     document.addEventListener('keydown', close);
//     return closeModal;
//   };
