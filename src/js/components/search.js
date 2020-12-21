const headerInput = document.querySelector('.header__input');
// console.dir(headerInput);

const shwoValue = (e) => {
    const query = e.target.value;
    console.log(query);
}

headerInput.addEventListener('input', shwoValue)



