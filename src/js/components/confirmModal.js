import confirmModalTemplate from '../../templates/confirmModal.hbs';
import { openInModal, closeModal } from './modal';
import { logOut } from './authentication';
import { clearMain } from './clearBtn'

export const confirmModal = () => {
  openInModal(confirmModalTemplate(), removeListeners);
  const exit = document.querySelector('.confirm-modal__btn_go');
  const cancel = document.querySelector('.confirm-modal__btn_cancl');
  const logOutHandler = () => {
    logOut();
    closeModal();
    clearMain();
    removeListeners();
  };
  const cancelHandler = () => {
    closeModal();
    removeListeners();
  };
  const removeListeners = () => {
    exit.removeEventListener('click', logOutHandler);
    cancel.removeEventListener('click', cancelHandler);
  };
  exit.addEventListener('click', logOutHandler);
  cancel.addEventListener('click', cancelHandler);
};
