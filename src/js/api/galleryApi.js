import axios from 'axios';
const properties = {
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  }
  const getViewport = () => {
    properties.width = window.screen.width
    properties.height = window.screen.height
    if (properties.width <= 767) {
      properties.isMobile = true;
    } else if (properties.width >= 768 && properties.width <= 1279) {
      properties.isTablet = true;
    } else properties.isDesktop = true;
    console.log(properties);
  }
  const cardsToLoad = () => {
    if (properties.isMobile) {
      return 1
    } else if (properties.isTablet){
      return 2
    } else return 4
  }
  
  const loadMoreBtn = document.querySelector('.load-more')
//   const loggerBtn = document.querySelector('.logger')
  const baseURL = 'https://callboard-backend.herokuapp.com';
  let categories = [];
  let russianCategories = [];
  let categoriesShown = 0;
  const createMarkup2 = async (array, num) => {
   await axios.get(`${baseURL}/call/russian-categories`).then(response => {
      russianCategories = [...response.data];    
    }).then(()=>{
      let acc = ''
      for (let i = 0; i < (array.length < num? array.length : num); i +=1){
        acc += `
        <li class="products__item">
                <div class="products__img-wrap">
                  <img class="products__img" src="${array[i].imageUrls[0]}" alt="${array[i].description}">
                </div>
                <div class="products__info">
                  <h3 class="products__info-name">${array[i].title}</h3>
                  <span class="products__new-price">${array[i].price} €</span>
                </div>
              </li>        
        `
      }
      const indexOfCategory = categories.indexOf(array[0].category)
      const list = `
        <li class="gallery__list">
            <div class="gallery__info">
              <h2 class="gallery__info-name">${russianCategories[indexOfCategory]}</h2>
              <a class="gallery__link_view-all" href="#">Смотреть все</a>
            </div>
            <button class="slider prev" type="button"></button>
            <ul class="products list">
            ${acc}
            </ul>
            <button class="slider next" type="button"></button>
        </li>     
      `
    document.querySelector('.gallery__wrap').insertAdjacentHTML('beforeend', list)
    })
  }
  
  
  const getCategories = async () => {
    await  axios.get(`${baseURL}/call/categories`).then(response => {
       categories = [...response.data];
       console.log(categories);
    })
  }
  const fetcherWithCounter = async (categoriesNum, cardsNum) => {  
      for (let i = 0; i<categoriesNum; i+=1) {
        await axios.get(`${baseURL}/call/specific/${categories[categoriesShown]}`).then( async response => await createMarkup2(response.data, cardsNum))
        categoriesShown += 1;
        console.log(categoriesShown);
        console.log(categories.length);
        if (categoriesShown === categories.length){
          loadMoreBtn.disabled = true;
      }
    }
  }
  
  
  export const init = async () =>{
    getViewport()  
    await getCategories()
    await fetcherWithCounter(3, cardsToLoad())
  }
//   init()
  
  loadMoreBtn.addEventListener('click', ()=>fetcherWithCounter(1, cardsToLoad()))
//   loggerBtn.addEventListener('click', () => {
//     console.log('categoriesShown :>> ', categoriesShown);
//     console.log('categories :>> ', categories);
//     console.log('russianCategories :>> ', russianCategories);
//   })