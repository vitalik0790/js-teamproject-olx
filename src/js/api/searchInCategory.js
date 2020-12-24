import { data } from '../data/data';
import axios from 'axios';

const search = async (category) => {
    await axios.get(`${data.baseURL}/call/specific/${category}`)
        .then(response => data.inCategories.push(...response.data));
};

export const clearFilter = () => {
    data.inCategories = [];
};

export const searchInCategory = async (category) => {
    if (data.inCategories.length === 0) {
        await search(category)
    } else {
        clearFilter();
        await search(category);
    }
};