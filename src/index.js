import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');


const DEBOUNCE_DELAY = 300;

const refs = {
 searchField: document.querySelector('#search-box'),
 countryList: document.querySelector('.country-list'),
 countryCard: document.querySelector('.country-info'),
}


refs.searchField.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  const name = refs.searchField.value.trim();
  if (!name) {
    refs.countryList.innerHTML = '';
    refs.countryCard.innerHTML = '';
    return;
  }


  fetchCountries(name)
    .then(countries => {
      refs.countryList.innerHTML = '';
      refs.countryCard.innerHTML = '';
      if (countries.length === 1) {
        refs.countryList.insertAdjacentHTML(
          'beforeend',
          createCountryList(countries)
        );
        
        refs.countryCard.insertAdjacentHTML(
          'beforeend',
          createCountryCard(countries)
        );
      } else
        if (countries.length > 10) {
          return Notify.info('Too many matches found. Please enter a more specific name.');
          
        } else {
          refs.countryList.insertAdjacentHTML(
            'beforeend',
            createCountryList(countries)
          );
        }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      refs.countryCard.innerHTML = '';
      refs.countryList.innerHTML = '';
      return error;
    });
}
function createCountryList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
                <li class="country-list__item">
                    <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 100px>
                    <h2 class="country-list__name">${name.official}</h2>
                </li>
                `;
    })
    .join('');
  return markup;
}

function createCountryCard(countries) {
  const markup = countries
    .map(({ capital, population, languages }) => {
      return `
              <ul class="country-info__list">
                  <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
                  <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
                  <li class="country-info__item"><p><b>Languages: </b>${Object.values(
                    languages
                  )}</p></li>
              </ul>
              `;
    })
    .join('');
  return markup;
}