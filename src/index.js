import '../node_modules/modern-normalize/modern-normalize.css';
import './styles.scss';
import { testAuth } from './js/components/authentication';
import { refs, openAdvModal } from './js/components/newAdvForm';

testAuth();


const images = [];

const toDataURL = (element) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(element.files[0]);
    });
};



const createItemMarkup = (image) => {
    return `
    <li>
    <img src=${image} alt=""/>
    </li>
    `;
};


const listMarkup = () => {
    return `
        <ul>
        ${images.reduce((acc, image) => {
        acc += createItemMarkup(image);
        return acc;
    }, "")}
        </ul>
        ${
        images.length < 3
            ? `<input class="image" type="file" data-index=${images.length}>`
            : ""
        } 
        `;
};


const content = document.querySelector(".adv-content");
content.innerHTML = listMarkup();

const addImage = () => {
    const input = document.querySelector(".image");
    toDataURL(input)
        .then((data) => images.push(data))
        .then(() => (content.innerHTML = listMarkup()));
};

const addButton = document.querySelector('form-input-file');
content.innerHTML = listMarkup();
addButton.addEventListener('click', addImage)