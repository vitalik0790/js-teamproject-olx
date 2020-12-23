import { data } from '../data/data';
import axios from 'axios';

const search = (category) => {
    return axios.get(`${data.baseURL}/call/specific/${category}`)
        .then(response => data.inCategories.push(...response.data));
};

export const clearFilter = () => {
    data.inCategories = [];
};

export const searchInCategory = (category) => {
    if (data.inCategories.length === 0) {
        return search(category)
    } else {
        clearFilter();
        return search(category);
    }
};