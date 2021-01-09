// отрисов
export const createHero = () => {
  let adds = []
  const divCard = document.querySelector('.card');
  // const display = document.querySelector('.display');
  const div = document.querySelector('.secondCard');
  const thirdCard = document.querySelector('.thirdCard');
  const desctop = document.querySelector('.desctop');
  const desctopSec = document.querySelector('.desctopSec');
  const desctopThir = document.querySelector('.desctopThir')
  const getCall = async () => {
    return await fetch('https://callboard-backend.herokuapp.com/call/ads')
      .then(response => response.json())
      .then(data => adds = [...data])

  }

  const createMainPic = (data) => {

    return `
   <div class="firstImages">
      <img class="name-firstImages" src=${data.imageUrl} alt="main image">
      <h3 class="description-first">${data.title}</h3>
      <span class="symbol-first">€<span class="price-first">${data.price}</span></span>
  </div>`
  }

  const createSecondPic = (data) => {

    return `
   <div class="secondImages">
      <img class="desctop-img" src=${data.imageUrl} alt="Pink Beat Headphones">
        <h3 class="description-tablet">${data.title}</h3>
        <span class="symbol-tablet">€<span class="price-tablet">${data.price}</span></span>
  </div>`
  }

  const createThirdPic = (data) => {

    return `
   <div class="thirdImages">
      <img class="desctop-img" src=${data.imageUrl} alt="Old School Radio">
        <h3 class="description-tablet">${data.title}</h3>
        <span class="symbol-tablet-acc">€<span class="price-tablet-acce">${data.price}</span></span>
  </div>`
  }

  // const createMarkup = async () => {
  //   await getCall()
  //   // console.log('work', adds);
  //   let i = 0;
  //   divCard.innerHTML = createMainPic(adds[i])
  //   i += 1;
  //   const timer = setInterval(() => {
  //     divCard.innerHTML = createMainPic(adds[i])
  //     i += 1;
  //     if (i == 5) {
  //       i = 0;
  //     }
  //   }, 3000);
  //   div.innerHTML = createSecondPic(adds[8])
  //   thirdCard.innerHTML = createThirdPic(adds[4])
  //   desctop.innerHTML = createDesctopFirPic(adds[2])
  //   desctopSec.innerHTML = createDesctopSecPic(adds[7])
  //   desctopThir.innerHTML = createDesctopThirPic(adds[3])
  // }
    const createMarkup = async () => {
      await getCall()
      // console.log('work', adds);
      
      divCard.innerHTML = `<ul class="hero-slider"></ul>`
      const heroSlider = document.querySelector('.hero-slider')
      for (let i = 0; i<=5; i+=1){
        const li = `<li class="hero-slider__item">${createMainPic(adds[i])}</li>`
        heroSlider.insertAdjacentHTML("beforeend", li)       
      }  
      // console.log(heroSlider);    
      $(document).ready(function () {
        $('.hero-slider').not('.slick-initialized').slick({
          dots: true,
          arrows: false,
          // variableWidth: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        });
      });

    div.innerHTML = createSecondPic(adds[8])
    thirdCard.innerHTML = createThirdPic(adds[4])
    desctop.innerHTML = createDesctopFirPic(adds[2])
    desctopSec.innerHTML = createDesctopSecPic(adds[7])
    desctopThir.innerHTML = createDesctopThirPic(adds[3])
  }
  createMarkup()

  const createDesctopFirPic = (data) => {
    return `
      <div class="desctopImages first">
              <img class="name-thirdImages" src=${data.imageUrl} alt="${data.title}">
              <h3 class="description-third">${data.title}</h3>
              <span class="symbol-third">€<span class="price-third">${data.price}</span></span>
            </div>
            `
  }
  const createDesctopSecPic = (data) => {
    return `
            <div class="desctopImages second">
              <img class="name-thirdImages" src=${data.imageUrl} alt="">
              <h3 class="description-third">${data.title}</h3>
              <span class="symbol-third sec-sym-dec">€<span class="price-third">${data.price}</span></span>
            </div>
            `
  }
  const createDesctopThirPic = (data) => {
    return `
            <div class="desctopImages third">
              <img class="name-thirdImages" src=${data.imageUrl} alt="">
              <h3 class="description-third">${data.title}</h3>
              <span class="symbol-third thir-sym-dec">€<span class="price-third">${data.price}</span></span>
            </div>
            `
  }

}
