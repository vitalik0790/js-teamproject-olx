import newAdvForm from '../../templates/newAdvForm.hbs';

const refs = {
    openModalBtn: document.getElementById('button'),
    modalAdv: document.querySelector('.advert-backdrop'),
    closeModalBtn: document.querySelector('.modal-button-icone'),
    contentAdvForm: document.querySelector('.contentAdvForm'),
}

const openAdvModal = (e) => {
    refs.contentAdvForm.innerHTML = newAdvForm();
    // refs.contentAdvForm.insertAdjacentHTML("beforeend", newAdvForm)
    refs.modalAdv.classList.remove('is-hidden');
    refs.closeModalBtn.addEventListener('click', closeAdvModal);
    // addEventListener('keydown', closeAdvModal)
    // if (e.code === 'Escape') closeAdvModal();
}
const closeAdvModal = () => {
    refs.modalAdv.classList.add('is-hidden');
    refs.contentAdvForm.innerHTML = '';
}

refs.openModalBtn.addEventListener('click', openAdvModal);

export { refs, openAdvModal }


// ===================================================
// const images = [];

// const toDataURL = (element) => {
//     return new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result);
//         reader.readAsDataURL(element.files[0]);
//     });
// };

// const createItemMarkup = (image) => {
//     return `
//     <li>
//     <img src=${image} alt=""/>
//     </li>
//     `;
// };


// const listMarkup = () => {
//     return `
//         <ul>
//         ${images.reduce((acc, image) => {
//         acc += createItemMarkup(image);
//         return acc;
//     }, "")}
//         </ul>
//         ${
//         images.length < 3
//             ? `<input class="image" type="file" data-index=${images.length}>`
//             : ""
//         } 
//         `;
// };


// const content = document.querySelector(".content");
// content.innerHTML = listMarkup();

// const addImage = () => {
//     const input = document.querySelector(".image");
//     toDataURL(input)
//         .then((data) => images.push(data))
//         .then(() => (content.innerHTML = listMarkup()));
// };

// const addButton = document.querySelector('form-input-file');
// addButton.addEventListener('click', addImage)


//     // < !DOCTYPE html>
//     //     <html lang="en">
//     //         <head>
//     //             <meta charset="UTF-8" />
//     //             <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     //             <title>Document</title>
//     //         </head>
//     //         <body>
//     //             <div class="content"></div>
//     //             <button class="addButton">Add new photo</button>

//     //             <script src="./index.js"></script>
//     //         </body>
//     //     </html>

