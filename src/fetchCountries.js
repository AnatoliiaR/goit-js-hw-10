export const fetchCountries = (name) => fetch('https://restcountries.com/v2/all?fields=name,capital,population,flags,languages')
    .then(r => {
        return r.json();
    })
    .then(countries => {
        console.log(countries);
    }).catch(error => {
        console.log(error);
    });
