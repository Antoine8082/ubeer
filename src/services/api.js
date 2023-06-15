import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://frozen-lake-57865.herokuapp.com/api',
    baseURL: 'http://localhost:3000/api',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default {
    getBeers() {
        return api.get('/beers');
    },
    getBreweries() {
        return api.get('/breweries');
    },
    getImages() {
        return api.get('/images');
    },
};
