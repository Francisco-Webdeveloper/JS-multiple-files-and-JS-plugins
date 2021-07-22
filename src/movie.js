const results = document.querySelector('ul#results');

// STEP 3
const insertMovieToTheDOM = (title, poster) => {
  const results = document.querySelector('ul#results');
  const movieHTML = `
    <li>
      <img src="${poster}" alt="" height="120">
      <p>${title}</p>
    </li>
  `;
  results.insertAdjacentHTML('beforeend', movieHTML);
}

// STEP 2
const fetchAPI = (movie) => {
  const apiKey = "adf1f2d7";
  const url = `http://www.omdbapi.com/?s=${movie}&apikey=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      const movies = data.Search;
      results.innerHTML = '';
      movies.forEach((movie) => {
        const title = movie.Title;
        const poster = movie.Poster;
        insertMovieToTheDOM(title, poster);
      })
    });
}

const addMovieList = (event) => {
  event.preventDefault();
  // find the input value //
  const input = document.getElementById('keyword');
  const searchedMovie = input.value;
  // when the event happens, we want to fetch the api
  fetchAPI(searchedMovie);
};


export { fetchAPI, addMovieList };
