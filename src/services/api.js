import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Remplacez cette URL par l'URL de votre API si elle est différente
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
