
const insertMovieToTheDOM = (title, poster) => {
  const results = document.querySelector('ul#results');
  const movieHTML = `
    <li>
      <p>${title}</p>
      <img src="${poster}" alt="">
    </li>    
  `;
  results.insertAdjacentHTML('beforeend', movieHTML);
}

const fetchAPI = (movie) => {
  const apiKey = "adf1f2d7";
  const url = `http://www.omdbapi.com/?s=${movie}&apikey=${apiKey}`;
  
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      // console.log(data);
      const movies = data.Search;
      
      // before inserting, empty the UL
      const results = document.querySelector('ul#results');
      results.innerHTML = '';

      // for each movie, insert it to the DOM
      movies.forEach((movie) => {
        const title = movie.Title;
        const poster = movie.Poster;
        insertMovieToTheDOM(title, poster);
      })
  
    });  
}

// find the form with id search-movies
const form = document.querySelector('form#search-movies');
// on this form we will add an event listener
form.addEventListener('submit', (event) => {
  event.preventDefault(); // to prevent the default behavior of submit (reloading the page)

  // find the input value //
  const input = document.getElementById('keyword');
  const searchedMovie = input.value;
  // when the event happens, we want to fetch the api
  fetchAPI(searchedMovie);
});