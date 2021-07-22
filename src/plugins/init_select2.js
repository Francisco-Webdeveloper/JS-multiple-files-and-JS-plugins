// imports
import $ from 'jquery';
import 'select2';

// function definitions
const initSelect2 = () => {
  $('.select2').select2({ width: '320px' }); // (~ document.querySelectorAll)
};

// exports (~ public interface)
export { initSelect2 };
