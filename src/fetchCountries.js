export const fetchCountries = function (name) {
   return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(r => {
            if (!r.ok) {
                throw new Error();
            }
            return r.json();
        });
};
  

// export const fetchCountries = function (name) {
//   return fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error();
//     }
//     return response.json();
//   });
// };