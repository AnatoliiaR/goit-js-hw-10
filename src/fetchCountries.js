export const fetchCountries = (name) => {
    fetch('restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages')
    .then(r => {
        if (!r.ok) {
            throw new Error(r.status);
        }
        return r.json();
    });
}
  