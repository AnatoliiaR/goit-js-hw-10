import './css/styles.css';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';
let name = null;
const DEBOUNCE_DELAY = 300;

const refs = {
    serchField: document.querySelector('[search-box]'),
    countryContainer: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.serchField.addEventListener('input', onSearch);

function onSearch(e) {
    e.preventDefault();
     name = e.currentTarget.elements.value.trim();
    if (!name) {
        refs.serchField.innerHTML = '';
  refs.serchField.innerHTML = '';
        return 
    }
    fetchCountries(name);

}


