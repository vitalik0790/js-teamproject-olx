import { closeModal } from './modal';
import axios from 'axios';
import { data } from '../data/data';
import { getToken } from '../utils/getToken';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error, success, notice } from '@pnotify/core';
import { camelCase } from 'lodash';
import { createMarkupFavoritesGoodsList } from './favorites-myGoodsList/favorites-myGoodsList';

const baseURL = 'https://callboard-backend.herokuapp.com/call';

const errorAlert = text =>
  error({
    text: `${text}`,
    sticker: false,
    closer: false,
    delay: 2000,
    width: '300px',
  });
const noticeAlert = text =>
  notice({
    text: `${text}`,
    sticker: false,
    closer: false,
    delay: 3000,
    width: '300px',
  });
const successAlert = text =>
  success({
    text: `${text}`,
    sticker: false,
    closer: false,
    delay: 2000,
    width: '300px',
  });

// ================================= MARKUP =========================================

export const newAdvFormComponent = advData => {
  let newAdv = {
    title: '',
    file: [],
    description: '',
    category: '',
    price: 0,
    phone: '',
  };
  
  const formAdv = document.forms.advForm;
  const inputWrapper = document.querySelector('.input-wrapper');
  const selectInput = document.querySelector('.select-input');
  // ================================= MARKUP =========================================
  const createFirstInput = () => {
    return `
    <li data-id="${newAdv.file.length}" class="file-loader">
        <label for="file_loader${newAdv.file.length}"   class="file-loader-label">
        <input type="file" id="file_loader${newAdv.file.length}"    class="file-loader-input" name='file'>
        <span class="file-loader-show-availabel">+</span>
        </label>
    </li>
    `;
  };
  const createSecondBlock = () => {
    let greyWrapp = '';
    for (let i = newAdv.file.length; i < 4; i += 1) {
      greyWrapp += `<li data-id="${i + 1}" class="file-loader grey"> 
            <label for="file_loader${
              newAdv.file.length
            }"   class="file-loader-label"></label>
            </li>`;
    }
    return greyWrapp;
  };
  const createMarkupCategories = () => {
    let categoriesMarkup = "<option value='' class='select-option'></option >";
    for (let i = 0; i < data.categories.length; i += 1) {
      categoriesMarkup += `
        <option required value='${data.originalCategories[i]}' class="select-option">${data.russianCategories[i]}
                </option> `;
    }
    return categoriesMarkup;
  };

  const createMainMarkup = () => {
    inputWrapper.innerHTML = createFirstInput();
    inputWrapper.insertAdjacentHTML('beforeend', createSecondBlock());
    selectInput.innerHTML = createMarkupCategories();
  };

  // ================================== end markup ================================================
  const getDataForm = e => {
    if (e.target.type === 'file') return;
    const { name, value } = e.target;
    newAdv[name] = value;
  };
  const toDataURL = element => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(element.files[0]);
    });
  };
  const onHandleChange = async e => {
    const { type } = e.target;
    if (type !== 'file') return;
    const id = e.target.closest(`[data-id]`).dataset.id;
    // console.log(id);
    const li = document.querySelector(`[data-id="${id}"]`);
      
    e.target.files[0] && await toDataURL(e.target).then(img => {
      const image = document.createElement('img');      
    const label = li.querySelector('label');      
    image.src = img;
    image.alt = 'picture';
    image.classList.add('img-adv-box');    
      const findImage = li.querySelector('img');
      if (findImage) {
        // const replaceableImage = li.querySelector('img');
        // console.log('replaceableImage :>> ', replaceableImage);
        findImage.replaceWith(image)
        return
      }
      else {
        label.append(image);        
      } 
      const span = label.querySelector('.file-loader-show-availabel');
      span && span.classList.add('in-visible');
      newAdv.file.push(img);
      li.classList.remove('grey');
    })
    if (newAdv.file.length < 5) {
      const greyBlock = document.querySelector('.grey');
      greyBlock.innerHTML = `
            <label for="file_loader${newAdv.file.length}" data-id=${newAdv.file.length}  class="file-loader-label">
                <input type="file" id="file_loader${newAdv.file.length}"    class="file-loader-input" name='file'>
                <span class="file-loader-show-availabel">+</span>
            </label>
            `;
    }
  };
  const getPrice = () => {
    if (
      (newAdv.category === 'free' ||
        newAdv.category === 'work' ||
        newAdv.category === 'trade') &&
      newAdv.price > 0
    ) {
      noticeAlert(
        'Цена должна быть 0 в категориях "Работа","Отдам бесплатно", "Обмен". Данные были откорректированы автоматически',
      ).open();
      return 0;
    } else {
      return Number(newAdv.price);
    }
  };
  const postNewAdv = async e => {
    e.preventDefault();
    const formData = new FormData();
    const getAdvToken = getToken();
    if (newAdv.file.length === 0) {
      errorAlert('Необходимо загрузить минимум 1 фото!').open();
    }
    const allInputsFiles = formAdv.querySelectorAll('.file-loader-input');
    formData.append('title', newAdv.title);
    formData.append('description', newAdv.description);
    formData.append('category', newAdv.category);
    if (newAdv.category !== 'free' &&
    newAdv.category !== 'work' &&
    newAdv.category !== 'trade'){
    formData.append('price', getPrice());
  } else formData.append('price', 0);
    formData.append('phone', newAdv.phone);
    for (let i = 0; i < allInputsFiles.length; i += 1) {
      if (allInputsFiles[i].files.length) {
        formData.append('file', allInputsFiles[i].files[0]);
      }
    }
    const options = {
      headers: {
        Authorization: 'Bearer ' + getToken(),
        'Content-Type': 'multipart/form-data',
      },
    };
    if (!advData) {
      if (getAdvToken) {
        try {
          const result = await axios.post(baseURL, formData, options);

          const object = { ...result.data, _id: result.data.id };

          data.user.ownCalls = [...data.user.ownCalls, object];
          const category = result.data.category;
          data.categoriesList[camelCase(category)].push(object);

          closeModal();
          successAlert('Объявление успешно записано!').open();
          if (document.querySelector('.favorites-myGoods')){
            createMarkupFavoritesGoodsList('Мои объявления', data.user.ownCalls, 'В моих объявлениях пока пусто');
            const btnInCardRef = document.querySelectorAll('.myGoods-btn');
            btnInCardRef.forEach(btn => btn.classList.add('myGoods-btn--active'));
          }
        } catch (error) {
          errorAlert('Что-то пошло не так( Попробуйте еще раз').open();
        }
      }
    } else {
      if (
        (newAdv.category === 'free' ||
          newAdv.category === 'work' ||
          newAdv.category === 'trade')
      ){
        formData.delete('price')
      }
      try {
        const result = await axios.patch(
          `${baseURL}/${newAdv._id}`,
          formData,
          options,
        );

        const object = { ...result.data, _id: result.data.id };
        data.user.ownCalls = [
          ...data.user.ownCalls.map(item =>
            item._id === newAdv._id ? object : item,
          ),
        ];

        const category = result.data.category;
        data.categoriesList[camelCase(category)].unshift(object);

        await closeModal();
        successAlert('Объявление успешно записано!').open();
        createMarkupFavoritesGoodsList('Мои объявления', data.user.ownCalls);
        const btnInCardRef = document.querySelectorAll('.myGoods-btn');
    btnInCardRef.forEach(btn => btn.classList.add('myGoods-btn--active'));
      } catch (error) {
        errorAlert('Что-то пошло не так( Попробуйте еще раз').open();
      }
    }
  };

  // =============================== EDIT ADV ==========================================

  const editAdvForm = () => {
    newAdv = { ...newAdv, ...advData };

    

    const formTitle = document.querySelector('.form-text');
    const deleteButton = document.querySelector('.button-box');
    formTitle.textContent = 'Редактировать объявление';
    deleteButton.innerHTML = `   <button type="button" data-button="delete-button"  class="clean-button">
                <svg class="delete-adv-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                    viewBox="0 0 32 32">
                    <title>file-1</title>
                    <path fill="#bbb"
                        d="M20.8 0h-19.2v32h28.8v-22.4l-9.6-9.6zM20.8 4.528l5.072 5.072h-5.072v-5.072zM27.2 28.8h-22.4v-25.6h12.8v9.6h9.6v16z">
                    </path>
                    <path fill="#bbb"
                        d="M22.016 15.471l-2.256-2.272-3.728 3.728-3.904-3.904-2.256 2.272 3.888 3.888-3.696 3.712 2.256 2.256 3.712-3.696 3.728 3.728 2.256-2.272-3.728-3.728 3.728-3.712z">
                    </path>
                </svg>
                <span class="delete-button-text">Удалить объявление</span>
            </button>`;
    selectInput.innerHTML = createMarkupCategories();
    
    formAdv.title.value = newAdv.title;
    formAdv.description.value = newAdv.description;
    formAdv.category.value = newAdv.category;
    formAdv.price.value = newAdv.price;
    formAdv.phone.value = newAdv.phone;
    // console.log(newAdv);

    const createPhotoMarkup = () => {
      return newAdv.imageUrls.reduce((acc, item) => {
        acc += `
                <li data-id="${newAdv.file.length}" class="file-loader">
                <label for="file_loader${newAdv.file.length}"   class="file-loader-label">
                <input type="file" id="file_loader${newAdv.file.length}"    class="file-loader-input" name='file'>
                <img src="${item}" alt=picture" class="img-adv-box"/>
                </label>
                </li>
                `;
        newAdv.file.push(item);
        return acc;
      }, '');
    };
    inputWrapper.innerHTML = createPhotoMarkup();

    if (newAdv.file.length < 5) {
      inputWrapper.insertAdjacentHTML('beforeend', createFirstInput());
    }

    let greyWrapp = '';
    for (let i = newAdv.file.length; i < 4; i += 1) {
      greyWrapp += `<li data-id="${i + 1}" class="file-loader grey"> 
            <label for="file_loader${
              newAdv.file.length
            }"   class="file-loader-label"></label>
            </li>`;
    }
    inputWrapper.insertAdjacentHTML('beforeend', greyWrapp);

    const deleteAdv = async e => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken();
      if (e.target.closest('[data-button="delete-button"]')) {
        try {
          const result = await axios.delete(`${baseURL}/${newAdv._id}`);
          // console.log(result);
          data.user.ownCalls = [
            ...data.user.ownCalls.filter(item => item._id !== newAdv._id),
          ];
          await closeModal();
          successAlert('Объявление успешно удалено!').open();
          if (document.querySelector('.favorites-myGoods')){
            createMarkupFavoritesGoodsList('Мои объявления', data.user.ownCalls, 'В моих объявлениях пока пусто');
            const btnInCardRef = document.querySelectorAll('.myGoods-btn');
    btnInCardRef.forEach(btn => btn.classList.add('myGoods-btn--active'));
          }
        } catch (error) {
          errorAlert('Что-то пошло не так( Попробуйте еще раз').open();
        }
      } else return;
    };

    formAdv.addEventListener('click', deleteAdv);
  };

  advData ? editAdvForm() : createMainMarkup();
  // console.log(data);
  formAdv.addEventListener('input', getDataForm);
  formAdv.addEventListener('change', onHandleChange);
  formAdv.addEventListener('submit', postNewAdv);
};
