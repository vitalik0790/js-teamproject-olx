import Siema from 'siema';

Siema.prototype.addPagination = function (itemRef) {
  for (let i = 0; i < this.innerElements.length; i++) {
    const btn = document.createElement('button');
    btn.classList.add('dots__item');
    btn.setAttribute('data-index', i);
    btn.addEventListener('click', () => this.goTo(i));
    itemRef.appendChild(btn);
  }
};

export const mobSlider = function (dotsRef) {
  const mySiema = new Siema({ onInit, onChange });

  function onInit() {
    this.addPagination(dotsRef);
    const dotsItem = dotsRef.querySelector('.dots__item');
    dotsItem.classList.add('dots__item--active');
  }

  function onChange() {
    changeAciveDot(this.currentSlide);
  }

  function changeAciveDot(idx) {
    const currentActiveDot = dotsRef.querySelector('.dots__item--active');
    if (currentActiveDot) {
      currentActiveDot.classList.remove('dots__item--active');

      const nextActiveDot = dotsRef.querySelector(`[data-index="${idx}"]`);
      nextActiveDot.classList.add('dots__item--active');
    }
  }
};
