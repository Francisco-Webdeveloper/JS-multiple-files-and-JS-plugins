// src/plugins/init_sortable.js
import Sortable from 'sortablejs';

// function definitions
const initSortable = () => {
  const list = document.querySelector('#results');
  Sortable.create(list, {
    ghostClass: "ghost",
    animation: 300,
    onEnd: (event) => {
      alert(`${event.oldIndex} moved to ${event.newIndex}`);
    }
});
};

// exports (~ public interface)
export { initSortable };
