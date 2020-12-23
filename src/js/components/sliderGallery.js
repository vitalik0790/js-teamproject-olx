// =============================

// export default $(document).ready(function () {
//   $('.js-slider').slick({
//     dots: true,
//     variableWidth: true,
//   });
// });
export default window.addEventListener('load', () => {
  $(document).ready(function () {
      $('.js-slider').slick({
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 3,
          centerMode: true,
          centerPadding: '60px',
          responsive: [{
                  breakpoint: 1024,
                  settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      infinite: true,
                      dots: true
                  }
              },
              {
                  breakpoint: 600,
                  settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                  }
              },
              {
                  breakpoint: 480,
                  settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                  }
              }
              // You can unslick at a given breakpoint now by adding:
              // settings: "unslick"
              // instead of a settings object
          ]
      });
  });
}, false);
