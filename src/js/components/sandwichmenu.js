  const sandwichmenu = document.getElementById('sandwichmenu');
  const getDivMenu = document.querySelector('.js_menu');

export const func = (e) => {
  e.preventDefault();
    
  sandwichmenu.classList.toggle("activ");
  getDivMenu.classList.toggle("activ");
    
}
  
sandwichmenu.addEventListener('click', func); 
getDivMenu.addEventListener('click', func);