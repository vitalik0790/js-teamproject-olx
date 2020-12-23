import { data } from '../data/data';
import axios from 'axios';

const searchAll = (query) => {
    return axios.get(`${data.baseURL}/call/find?search=${query}`)
        .then(response => data.inAll.push(...response.data));
}

export const clearAll = () => {
    data.inAll = [];
};

export const searchInAll = (query) => {
    if (data.inAll.length === 0) {
        return searchAll(query)
    } else {
        clearAll();
        return searchAll(query);
    }
};