import newAdvForm from '../../templates/newAdvForm.hbs';
import firstInput from '../../templates/firstInput.hbs';
import secondInput from '../../templates/secondInput.hbs';
import { openInModal, closeModal } from './modal';
import axios from 'axios';
import { data } from '../data/data'
import { getToken } from '../utils/getToken'


// axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmUzMWI2MWE0ZjYyYzAwMTdhZWE3ZTIiLCJzaWQiOiI1ZmUzMWI2NGE0ZjYyYzAwMTdhZWE3ZTQiLCJpYXQiOjE2MDg3MTkyMDQsImV4cCI6MTYwODcyMjgwNH0.aqHR6o_1qA-DsEvG1OFvQ9awNLm8BItSmhJBT4Y5BRc';
const baseURL = 'https://callboard-backend.herokuapp.com/call';
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

const options = {
    headers: {
        Authorization: 'Bear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmUzMWI2MWE0ZjYyYzAwMTdhZWE3ZTIiLCJzaWQiOiI1ZmUzMWI2NGE0ZjYyYzAwMTdhZWE3ZTQiLCJpYXQiOjE2MDg3MTkyMDQsImV4cCI6MTYwODcyMjgwNH0.aqHR6o_1qA-DsEvG1OFvQ9awNLm8BItSmhJBT4Y5BRc',
        'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
    }
}

// =================================================================================
const refs = {
    openModalBtn: document.getElementById('button'),
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
    price: 0,
    phone: "",
}


const postNewAdv = async (e) => {
    e.preventDefault();
    const getAdvToken = getToken();
    if (getAdvToken) {
        newAdv.file = newAdv.file.join('')
        newAdv.price = Number(newAdv.price)
        console.log(newAdv.file);
        try {
            await axios.post(baseURL, { ...newAdv }, options)
            // closeModal();
        } catch (error) {
            console.log("sendForm", error);
            alert("Something went wrong. Try again")
        }
    }

}
const getDataForm = (e) => {
    if (e.target.type === "file") {
        return;
    }
    const { name, value } = e.target;
    newAdv[name] = value;
}

const createBox = () => {
    let quantityImg = 0;
    let iFor = 0;
    if (window.screen.width > 320 && window.screen.width < 768) {
        quantityImg = 6;
        iFor = 5;
    } else {
        quantityImg = 5;
        iFor = 4;
    }
    const inputWrapper = document.querySelector('.input-wrapper');
    inputWrapper.innerHTML = '';
    newAdv.file.forEach(img => inputWrapper.insertAdjacentHTML('beforeend', `<img src=${img} alt="" class ="img-adv-box" name="file">`))

    if (newAdv.file.length < quantityImg) {
        inputWrapper.insertAdjacentHTML('beforeend', firstInput())
        const input = document.querySelector('.file-loader-input');
        input.addEventListener('change', async (e) => {
            await toDataURL(e.target)
                .then(data => newAdv.file.push(data))
            createBox();

        })
    }
    for (let i = newAdv.file.length; i < iFor; i += 1) {
        inputWrapper.insertAdjacentHTML('beforeend', secondInput())
    }
}

const openAdvModal = () => {
    openInModal(newAdvForm(data));
    createBox();
    refs.formAdv = document.forms.advForm;
    refs.formAdv.addEventListener("input", getDataForm);
    refs.formAdv.addEventListener('submit', postNewAdv);
}

//refs.openModalBtn.addEventListener('click', openAdvModal);



// =================================================================


export { refs, openAdvModal }






