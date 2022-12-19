import './css/styles.css';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';
let nameCountry = null;
const DEBOUNCE_DELAY = 300;

const refs = {
    serchField: document.getElementById('search-box'),
    countryContainer: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.serchField.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();
     nameCountry = e.target.value.trim();
    if (!nameCountry) {
        refs.serchField.innerHTML = '';
        refs.serchField.innerHTML = '';
        return 
    }
    fetchCountries(nameCountry).then(renderCountry).catch(err => {
        Notiflix.Notify.failure(
          'Oops, there is no country with that name',
          err
        );
      });

}


function renderCountry(countries) {

    if (countries.lenght === 1) {
        return countries.map(({ flags, name, capital, population, languages }) => {
            return`
            <div class="country-list__item">
                <img class="country-list__flag" src />${flags.svg} alt=${name.official}>
                <h2>${name.official}</h2>
            </div><div class="country-info__item">
                    <p>
                        <b>Capital: </b>${capital}
                    </p>
                </div><div class="country-info__item">
                    <p>
                        <b>Population: </b>${population}
                    </p>
                </div><div class="country-info__item">
                    <p>
                        <b>Languages: </b>${Object.values(languages)}
                    </p>
                </div>`;
        }).join('');
    }

    else {
        if (countries.lenght <= 10) {
            return countries.map(({ flags, name }) => {
        // console.log(flags.svg, name.official);
        return `<div class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="${name.official}">
              <h2 class="country-list__name">${name.official}</h2>
          </div>
          `;
      })
      .join('');
        }
    }

   
        if (countries.lengh > 10) {
             
      refs.countryInfo.innerHTML = '';
      refs.countryContainer.innerHTML = '';
      return Notify.failure('Oops, there is no country with that name');
        }
    }









          

     

    
