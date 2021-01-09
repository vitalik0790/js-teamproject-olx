import axios from 'axios';
import { data } from '../data/data';
import { camelCase } from 'lodash';
import { openProductInfo } from '../components/productInfo/productInfo';
import { searchInCategory } from './searchInCategory';
import { updateMarkup } from '../components/search';

const getViewport = () => {
  data.properties.width = window.screen.width;
  data.properties.height = window.screen.height;
  if (data.properties.width <= 767) {
    data.properties.isMobile = true;
  } else if (data.properties.width >= 768 && data.properties.width <= 1279) {
    data.properties.isTablet = true;
  } else data.properties.isDesktop = true;
  
};


const baseURL = 'https://callboard-backend.herokuapp.com';
// let categories = [];
// let russianCategories = [];
let categoriesShown = 0;
const createMarkup = async (array, num) => {
  if (!data.russianCategories.length) {    
    await getRussianCategories();   
  }
  let acc = '';
  for (let i = 0; i < (array.length < num ? array.length : num); i += 1) {
    acc += `
      <li class="products__item" data-id="${array[i]._id
      }" data-category="${camelCase(array[i].category)}">
              <div class="products__img-wrap">
                <img class="products__img" src="${array[i].imageUrls[0]
      }" alt="${array[i].description}">
              </div>
              <div class="products__info">
                <h3 class="products__info-name">${array[i].title}</h3>
                <span class="products__new-price">${array[i].price} €</span>
              </div>
            </li>        
      `;
  }
  const indexOfCategory = data.categories.indexOf(camelCase(array[0].category));
  const list = `
  <li class="gallery__list" data-category-name="${camelCase(
    array[0].category,
  )}">
          <div class="gallery__info">
            <h2 class="gallery__info-name">${data.russianCategories[indexOfCategory]
    }</h2>
            <a class="gallery__link_view-all" href="#" data-link="${camelCase(array[0].category)}">Смотреть все</a>
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
  const result = await axios.get(`${baseURL}/call/categories`);

  result.data.forEach(element => {
    data.categories.push(camelCase(element));
    data.originalCategories.push(element);
  });
  result.data.forEach(element => {
    data.categoriesList[camelCase(element)] = [];
    getCategory(camelCase(element));
  });

  
};

const getCategory = async categoryName => {
  try {
    const result = await axios.get(
      `https://callboard-backend.herokuapp.com/call/specific/${categoryName}`,
    );
    data.categoriesList[categoryName] = [...result.data];
  } catch (error) {
    console.log(error);
  }
};

const getRussianCategories = async () => {
  await axios.get(`${baseURL}/call/russian-categories`).then(response => {
    data.russianCategories = [...response.data];  
  });
};



export const init = async () => {
  const loadMoreBtn = document.querySelector('.load-more');
  const fetcherWithCounter = async (categoriesNum, cardsNum) => {
    if (!data.categories.length) {     
      await getCategories();     
    }
    for (let i = 0; i < categoriesNum; i += 1) {
      await axios
        .get(`${baseURL}/call/specific/${data.categories[data.renderedCategories.length]}`)
        .then(async response => {
          await createMarkup(response.data, cardsNum);
          if (data.renderedCategories.includes(data.categories[data.renderedCategories.length])) {
            return
          } else {
            data.renderedCategories.push(data.categories[data.renderedCategories.length]);
          }

          
          // console.log(data);  

          // ================= открытие ProductInfo по клику на карточку ======
          const galleryLisRef = document.querySelector(
            `[data-category-name="${data.categories[data.renderedCategories.length - 1]}"]`,
          );
          galleryLisRef.addEventListener('click', onCardClickInGallery);

          function onCardClickInGallery(event) {
            if (!event.target.closest('li[data-id]')) return;
            const currentCategory = event.target.closest('li').dataset.category;
            const targetCard = data.categoriesList[currentCategory].find(
              card => card._id === event.target.closest('li').dataset.id,
            );
            // console.log(targetCard);
            openProductInfo(targetCard);
          }


          const linkShowAllCategory = async e => {
            e.preventDefault()
            if (e.target.nodeName === "A") {
              await searchInCategory(e.target.dataset.link);
              updateMarkup(data.inCategories);
            }
          };
          // const index = data.renderedCategories.length -1 ;
          // console.log(index);
          const galleryLinkRef = document.querySelector(`[data-link="${camelCase(data.categories[data.renderedCategories.length - 1])}"]`)
          galleryLinkRef.addEventListener('click', linkShowAllCategory);

        })
        .catch(error => console.log(error));      
      if (data.renderedCategories.length === data.categories.length) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.add('is-disabled');
      }
    }
    $(document).ready(function () {
      $('.js-slider').not('.slick-initialized').slick({
        dots: true,
        variableWidth: true,
      });
    });
  };
  const loadMore = async () => {
    await fetcherWithCounter(1, 8);
    window.scrollBy({
      top: document.documentElement.clientHeight,
      behavior: 'smooth',
    });   
  };

  loadMoreBtn.addEventListener('click', loadMore);

  getViewport();
  await getCategories();
  await getRussianCategories();
  await fetcherWithCounter(3, 8);
};