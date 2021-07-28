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

## Plugins

### NPM
It hosts many open source JavaScript libraries / packages.

### Yarn
Software used to download the JS packages

**Addiing a new package**
```bash
yarn add <package>
yarn add <package> [--dev].  <------ just for development reasons. Ex: Eslint
```

### First plugin: Sortable JS
A plugin to drag-and-drop items in a list
**Download package**
```bash
yarn add sortablejs
```
Open the **package.json**
**Usage**
```bash
mkdir -p src/plugins
touch src/plugins/init_sortable.js
```
```bash
// src/plugins/init_sortable.js
import Sortable from 'sortablejs';

const initSortable = () => {
  const list = document.querySelector('#results');
  Sortable.create(list);
};

export { initSortable };
```
Call it from **index.js**
```bash
// src/index.js
import { fetchMovies, updateResultsList } from './movies';
import { initSortable } from './plugins/init_sortable'; // <-- add this

fetchMovies('harry potter');
initSortable(); // <-- add this

const form = document.querySelector('#search-form');
form.addEventListener('submit', updateResultsList);
```
**Add some style**
```bash
#results li {
  cursor: grab;
}

#results li:active {
  cursor: grabbing;
}

#results li.ghost {
  filter: grayscale(1);
  opacity: 0.5;
}
```
**Adding options**
```bash
Sortable.create(list, {
  ghostClass: "ghost",
  animation: 150,
  onEnd: (event) => {
    alert(`${event.oldIndex} moved to ${event.newIndex}`);
  }
});
```  

### jQuery dependent plugins
#### Understand jQuery syntax:
```bash
$('#submit').on('click', function(event) {
  event.preventDefault();
  $.ajax({
    url: 'https://api.github.com/orgs/lewagon/repos',
    success: function(data) {
      // Do something with the response
    }
  });
});
```
#### Write it the modern way
```bash
document.getElementById('submit').addEventListener('click', (event) => {
  event.preventDefault();
  fetch('https://api.github.com/orgs/lewagon/repos')
    .then(response => response.json())
    .then((data) => {
      // Do something with the response
    });
});
```
### Second plugin: Select2
```bash
yarn add jquery select2
```
```bash
// imports
import { fetchAPI, addMovieList } from './movie';
import { initSortable } from './plugins/init_sortable';
import { initMarkdown } from './plugins/init_markdown';
import { initSelect2 } from './plugins/init_select2';

// initialize plugins
initSortable();
initMarkdown();
initSelect2();

// listeners
const form = document.querySelector('form#search-movies');
// on this form we will add an event listener
form.addEventListener('submit', addMovieList);

// AJAX calls
fetchAPI("Harry Potter");
```

```bash
// imports
import $ from 'jquery';
import 'select2';

// function definitions
const initSelect2 = () => {
  $('.select2').select2({ width: '320px' }); // (~ document.querySelectorAll)
};

// exports (~ public interface)
export { initSelect2 };
```
