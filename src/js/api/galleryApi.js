import axios from 'axios';
import { data } from '../data/data';

// const properties = {
//     width: 0,
//     height: 0,
//     isMobile: false,
//     isTablet: false,
//     isDesktop: false,
//   }
const getViewport = () => {
  data.properties.width = window.screen.width;
  data.properties.height = window.screen.height;
  if (data.properties.width <= 767) {
    data.properties.isMobile = true;
  } else if (data.properties.width >= 768 && data.properties.width <= 1279) {
    data.properties.isTablet = true;
  } else data.properties.isDesktop = true;
  console.log(data.properties);
};

// const cardsToLoad = () => {
//   if (properties.isMobile) {
//     return 1
//   } else if (properties.isTablet){
//     return 2
//   } else return 4
// }

//   const loggerBtn = document.querySelector('.logger')
const baseURL = 'https://callboard-backend.herokuapp.com';
// let categories = [];
// let russianCategories = [];
let categoriesShown = 0;
const createMarkup = async (array, num) => {
  if (!data.russianCategories.length) {
    console.log(data.russianCategories);
    await getRussianCategories();
    console.log(data.russianCategories);
  }
  let acc = '';
  for (let i = 0; i < (array.length < num ? array.length : num); i += 1) {
    acc += `
      <li class="products__item" data-id="${array[i]._id}">
              <div class="products__img-wrap">
                <img class="products__img" src="${array[i].imageUrls[0]}" alt="${array[i].description}">
              </div>
              <div class="products__info">
                <h3 class="products__info-name">${array[i].title}</h3>
                <span class="products__new-price">${array[i].price} €</span>
              </div>
            </li>        
      `;
  }
  const indexOfCategory = data.categories.indexOf(array[0].category);
  const list = `
      <li class="gallery__list">
          <div class="gallery__info">
            <h2 class="gallery__info-name">${data.russianCategories[indexOfCategory]}</h2>
            <a class="gallery__link_view-all" href="#">Смотреть все</a>
          </div>          
          <ul class="products js-slider">               
          ${acc}          
          </ul>          
      </li>     
    `;
  document
    .querySelector('.gallery__wrap')
    .insertAdjacentHTML('beforeend', list);
};

const getCategories = async () => {
  await axios.get(`${baseURL}/call/categories`).then(response => {
    data.categories = [...response.data];
    //  console.log( data.categories);
  });
};

const getRussianCategories = async () => {
  await axios.get(`${baseURL}/call/russian-categories`).then(response => {
    data.russianCategories = [...response.data];
    //  console.log(data.russianCategories);
  });
};

const fetcherWithCounter = async (categoriesNum, cardsNum) => {
  if (!data.categories.length) {
    // console.log(data.categories);
    await getCategories();
    // console.log(data.categories);
  }
  for (let i = 0; i < categoriesNum; i += 1) {
    await axios
      .get(`${baseURL}/call/specific/${data.categories[categoriesShown]}`)
      .then(async response => await createMarkup(response.data, cardsNum));
    categoriesShown += 1;
    // console.log(categoriesShown);
    // console.log(categories.length);
    //   if (categoriesShown === data.categories.length){
    //     loadMoreBtn.disabled = true;
    // }
  }
  $(document).ready(function () {
    $('.js-slider').slick({
      dots: true,
      variableWidth: true,
    });
  });
};
// const loadMoreBtn = document.querySelector('.load-more')

export const init = async () => {
  const loadMoreBtn = document.querySelector('.load-more');
  const fetcherWithCounter = async (categoriesNum, cardsNum) => {
    if (!data.categories.length) {
      // console.log(data.categories);
      await getCategories();
      // console.log(data.categories);
    }
    for (let i = 0; i < categoriesNum; i += 1) {
      await axios
        .get(`${baseURL}/call/specific/${data.categories[categoriesShown]}`)
        .then(async response => await createMarkup(response.data, cardsNum))
        .catch(error => console.log(error));
      categoriesShown += 1;
      // console.log(categoriesShown);
      // console.log(data.categories.length);
      if (categoriesShown === data.categories.length) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.add('is-disabled');
      }
    }
    $(document).ready(function () {
      $('.js-slider').slick({
        dots: true,
        variableWidth: true,
      });
    });
  };
  const loadMore = async () => {
    await fetcherWithCounter(1, 8);
    await $('.js-slider').slick('unslick');
    await $(document).ready(function () {
      $('.js-slider').slick({
        dots: true,
        variableWidth: true,
      });
    });
  };

  loadMoreBtn.addEventListener('click', loadMore);

  getViewport();
  await getCategories();
  await getRussianCategories();
  await fetcherWithCounter(3, 8);
};

// loadMoreBtn.addEventListener('click', ()=>fetcherWithCounter(1, cardsToLoad()))
//   loggerBtn.addEventListener('click', () => {
//     console.log('categoriesShown :>> ', categoriesShown);
//     console.log('categories :>> ', categories);
//     console.log('russianCategories :>> ', russianCategories);
//   })
