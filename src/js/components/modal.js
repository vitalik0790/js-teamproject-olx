const refs = {
  backdrop: document.querySelector('.backdrop'),
  modal: document.querySelector('.modal'),
  close: document.querySelector('.modal-close'),
  content: document.querySelector('.modal-content'),
};

const closeModal = () => {
  refs.backdrop.classList.add('is-hidden');
  refs.content.innerHTML = '';
  refs.close.removeEventListener('click', closeModal);
  refs.backdrop.removeEventListener('click', closeModal);
  removeEventListener('keydown', checkEscape);
};

const checkEscape = ev => {
  if (ev.code === 'Escape') closeModal();
};

const checkBackdrop = ev => {
  if (ev.target === ev.currentTarget) closeModal();
};

const openInModal = content => {
  refs.content.innerHTML = content;
  refs.backdrop.classList.remove('is-hidden');
  refs.close.addEventListener('click', closeModal);
  refs.backdrop.addEventListener('click', checkBackdrop);
  addEventListener('keydown', checkEscape);
};

export { openInModal, closeModal };
