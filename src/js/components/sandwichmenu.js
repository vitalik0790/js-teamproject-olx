export const sandwichmenu = document.getElementById('sandwichmenu');
  const func = (e) => {
    e.preventDefault();
    const getDivMenu = document.querySelector('.js_menu');

    sandwichmenu.classList.toggle("active");
    getDivMenu.classList.toggle("active");
  }
  
  sandwichmenu.addEventListener('click', func); 