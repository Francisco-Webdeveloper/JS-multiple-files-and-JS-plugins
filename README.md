## Usage

First clone this repository to your laptop. You must have Node (> v4) and [yarn](https://yarnpkg.com/lang/en/docs/install/) installed.

```bash
cd ~/code/<your_github_nickname>
git clone git@github.com:Francisco-Webdeveloper/JS-multiple-files-and-JS-plugins-Demo.git
cd my-js-project
rm -rf .git
yarn install
stt # Open this folder in Sublime Text
```

Make sure you have `./node_modules/.bin` in your `$PATH`! This way you can run this:

```bash
eslint lib
webpack-dev-server
```

Once a file has been updated in Sublime (or any other text editor), you can run it with:

```bash
node lib/01_types.js
```

### Separate concerns

Write functions in separate files to separate code by responsibility. For example: movie.js will take functions only about movies.

**Export the function you call in src/index.js:**
```bash
// src/movies.js

// [...]

const fetchMovies = (query) => {
  fetch(`http://www.omdbapi.com/?s=${query}&apikey=adf1f2d7`)
    .then(response => response.json())
    .then(insertMovies);
};

export { fetchMovies }; // <-- Add this line
```
**Import the function you call in src/index.js:**
```bash
// src/index.js
import { fetchMovies } from './movies'; // <-- add this line

fetchMovies('harry potter');

const form = document.querySelector('#search-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  list.innerHTML = '';
  const input = document.querySelector('#search-input');
  fetchMovies(input.value);
});
```
**Multiple exports**
```bash
// src/movies.js
// [...]

const updateResultsList = (event) => {
  event.preventDefault();
  list.innerHTML = '';
  const input = document.querySelector('#search-input');
  fetchMovies(input.value);
}

export { fetchMovies, updateResultsList }; // <-- separate functions with a coma
```
**Multiple imports**
```bash
// src/index.js
import { fetchMovies, updateResultsList } from './movies';

fetchMovies('harry potter');

const form = document.querySelector('#search-form');
form.addEventListener('submit', updateResultsList);
```

#### General Rules
* Implement **functions** in separate files. **Export** them
* Import **function** in the **entry file** and use it.
