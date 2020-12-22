import newAdvForm from '../../templates/newAdvForm.hbs';
import firstInput from '../../templates/firstInput.hbs';
import secondInput from '../../templates/secondInput.hbs';
import image from '../../templates/image.hbs';
import { openInModal, closeModal } from './modal';
import axios from 'axios';
import { data } from '../data/data'



const baseURL = 'https://callboard-backend.herokuapp.com/call'

// =================================================================================
const refs = {
    openModalBtn: document.getElementById('button'),
    modalAdv: document.querySelector('.advert-backdrop'),
    closeModalBtn: document.querySelector('.modal-button-icone'),
    contentAdvForm: document.querySelector('.contentAdvForm'),
    formAdv: document.forms.advForm,
}

// =========================== input Img ===========================================
const toDataURL = (element) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(element.files[0]);
    });
};

// ============================= Modal ===================================
const newAdv = {
    title: "",
    file: [],
    description: "",
    category: "",
    price: "",
    phone: "",

}
const postNewAdv = async (e) => {
    e.preventDefault();
    const result = await axios.post(baseURL, { ...newAdv, price: Number(newAdv.price) })
    console.log(result);
}
const getDataForm = (e) => {
    if (e.target.type === "file") {
        return;
    }
    const { name, value } = e.target;
    newAdv[name] = value;
    console.log(newAdv);
}

const createBox = () => {
    const inputWrapper = document.querySelector('.input-wrapper');
    inputWrapper.innerHTML = '';
    newAdv.file.forEach(img => inputWrapper.insertAdjacentHTML('beforeend', `<img src=${img} alt="" class ="img-adv-box" name="file">`))
    if (newAdv.file.length < 6) {
        inputWrapper.insertAdjacentHTML('beforeend', firstInput())
        const input = document.querySelector('.file-loader-input');
        input.addEventListener('change', async (e) => {
            await toDataURL(e.target)
                .then(data => newAdv.file.push(data))
            createBox();

        })
    }
    for (let i = newAdv.file.length; i < 5; i += 1) {
        inputWrapper.insertAdjacentHTML('beforeend', secondInput())
    }

}

const openAdvModal = (e) => {
    openInModal(newAdvForm(data));
    createBox();
    refs.formAdv = document.forms.advForm;
    refs.formAdv.addEventListener("input", getDataForm);
    refs.formAdv.addEventListener('submit', postNewAdv);
}

refs.openModalBtn.addEventListener('click', openAdvModal);



// =================================================================


export { refs, openAdvModal }






