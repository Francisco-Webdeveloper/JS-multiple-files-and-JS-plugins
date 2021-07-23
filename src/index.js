
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

