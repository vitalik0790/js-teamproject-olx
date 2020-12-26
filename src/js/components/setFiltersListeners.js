import { data } from "../data/data";

console.log(data);

export const serFiltersListeners = () => {
    console.log(data.categories);
    data.categories.forEach(category => {
        console.log(category);
        console.log(document.getElementById(category));
    document.getElementById(category).addEventListener('click', selectCat);
    document.getElementById(category + 'Main').addEventListener('click', selectCat);
    document.getElementById(category + 'Tablet').addEventListener('click', selectCat);

    console.log(document.getElementById(category));
    });
    

    
};

const selectCat = (e) => {
    console.log(e);

}
