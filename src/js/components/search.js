const headerInput = document.querySelector('.header__input');
// console.dir(headerInput);

const shwoValue = () => {
    const query = headerInput.value;
    console.log(query);
}
headerInput.addEventListener('input', shwoValue)



