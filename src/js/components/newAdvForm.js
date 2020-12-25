import newAdvForm from '../../templates/newAdvForm.hbs';
import { openInModal, closeModal } from './modal';
import axios from 'axios';
import { data } from '../data/data'
import { getToken } from '../utils/getToken'
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error, success, notice } from '@pnotify/core';

const baseURL = 'https://callboard-backend.herokuapp.com/call';

// const alert = {
//     text: `${text}`,
//     sticker: false,
//     closer: false,
//     delay: 3000,
// }

const errorAlert = (text) => error({
    text: `${text}`,
    sticker: false,
    closer: false,
    delay: 3000,
})
const noticeAlert = (text) => notice({
    text: `${text}`,
    sticker: false,
    closer: false,
    delay: 3000,
})
const successAlert = (text) => success({
    text: `${text}`,
    sticker: false,
    closer: false,
    delay: 3000,
})

const options = {
    headers: {
        Authorization: "Bearer " + getToken(),
        'Content-Type': 'multipart/form-data',
    }
}

// =================================================================================
const refs = {
    openModalBtn: document.getElementById('button'),
    closeModalBtn: document.querySelector('.modal-button-icone'),
    contentAdvForm: document.querySelector('.contentAdvForm'),
    formAdv: document.forms.advForm,
    inputs: document.querySelector('.tel-label'),
    inputWrapper: document.querySelector('.input-wrapper'),
    cleanButton: document.querySelector('.clean-button'),
}

// =========================== input Img ===========================================
const toDataURL = (element) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(element.files[0]);
    });
};


// ============================= DATA===================================
const newAdv = {
    title: "",
    file: [],
    description: "",
    category: "",
    price: 0,
    phone: "",
}

const formData = new FormData();

const getPrice = () => {
    if (newAdv.category === "free" || newAdv.category === "work" || newAdv.category === "trade") {
        noticeAlert('Цена должна быть 0 в категориях "work","free", "trade". Данные были откорректированы автоматически').open()
        return 0
    } else {
        return Number(newAdv.price)
    }
}

// ================================= MARKUP =========================================


const getDataForm = (e) => {
    if (e.target.type === "file") {
        return;
    }
    const { name, value } = e.target;
    newAdv[name] = value;
}

const createFirstInput = (id) => {
    return `
    <li data-id="${id}" class="file-loader">
 <label for="file_loader${id}"   class="file-loader-label">
    <input type="file" id="file_loader${id}"    class="file-loader-input" name='file'>
   
        <span class="file-loader-show-availabel">+</span>
    </label>

</li>
    `
    let label = document.getElementById(`file_loader${id}`).style.marginRight = '10px'

}
const createSecondBlock = () => {
    let greyWrapp = '';
    const greyList = document.querySelector('.grey-wrapper');
    for (let i = newAdv.file.length; i < 4; i += 1) {
        greyWrapp += `<li class="file-loader-label"></li>`
    }
    greyList.innerHTML = greyWrapp;
}

const createBox = () => {
    // let quantityImg = 0;
    // if (window.screen.width > 320 && window.screen.width < 768) {
    //     quantityImg = 6;
    // } else {
    //     quantityImg = 5;
    // }
    if (newAdv.file.length < 5) {
        refs.inputWrapper.insertAdjacentHTML('beforeend', createFirstInput(newAdv.file.length))
    }
    createSecondBlock()
}

const onHandleChange = async (e) => {
    const { type } = e.target;
    if (type !== 'file') return
    const id = e.target.closest('[data-id]').dataset.id;
    await toDataURL(e.target).then(img => {
        const image = document.createElement('img');
        const li = document.querySelector(`[data-id="${id}"]`);
        const label = li.querySelector('label');
        image.src = img;
        image.alt = 'picture';
        image.classList.add('img-adv-box');
        label.append(image);
        const span = label.querySelector('.file-loader-show-availabel');
        span.classList.add('in-visible')
        newAdv.file.push(img);

    })
    if (newAdv.file.length < 5) {
        refs.inputWrapper.insertAdjacentHTML('beforeend', createFirstInput(newAdv.file.length))

        createSecondBlock()
    }
}

const clearMarkup = () => {
    refs.formAdv.reset();
    const parentImg = document.querySelector('.file-loader-input');
    const fullImg = document.querySelector('.img-adv-box');
    if (parentImg.contains(fullImg)) {
        // fullImg.remove()
        console.log('gggggggg');
    }
}
// ===============================Open Modal =================================
const openAdvModal = () => {
    openInModal(newAdvForm(data));
    const select = document.querySelector(".select-option").text = "";
    refs.formAdv = document.forms.advForm;
    refs.inputWrapper = refs.formAdv.querySelector('.input-wrapper')
    refs.cleanButton = document.querySelector('.clean-button')
    createBox();
    refs.formAdv.addEventListener("input", getDataForm);
    refs.formAdv.addEventListener('submit', postNewAdv);
    refs.formAdv.addEventListener('change', onHandleChange)
    refs.cleanButton.addEventListener('click', clearMarkup)
}

// ================================= POST ADV ================================
const postNewAdv = async (e) => {
    e.preventDefault();
    const getAdvToken = getToken();
    if (newAdv.file.length === 0) {
        errorAlert("Необходимо загрузить минимум 1 фото!").open()
    }
    if (getAdvToken) {
        console.log(newAdv.file);
        try {
            const allInputsFiles = refs.formAdv.querySelectorAll('.file-loader-input')
            console.log(allInputsFiles);
            formData.append('title', newAdv.title)
            formData.append('description', newAdv.description)
            formData.append('category', newAdv.category)
            formData.append('price', getPrice())
            formData.append('phone', newAdv.phone)
            for (let i = 0; i < allInputsFiles.length; i += 1) {
                if (allInputsFiles[i].files.length) {
                    formData.append('file', allInputsFiles[i].files[0]);
                }
            }
            await axios.post(baseURL, formData, options)
            await closeModal();
            successAlert("Объявление успешно записано!").open()
        } catch (error) {
            console.log("sendForm", error);
            errorAlert("Что-то пошло не так( Попробуйте еще раз").open()
        }

    }

}

// =================================================================

export { refs, openAdvModal }






