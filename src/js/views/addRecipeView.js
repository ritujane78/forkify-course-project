import Views from './Views.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends Views {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully added :)';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  constructor() {
    super();
    this._addHandlerShowPopup();
    this._addHandlerHidePopup();
  }
  toggleOpen() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerShowPopup() {
    this._btnOpen.addEventListener('click', this.toggleOpen.bind(this));
  }
  _addHandlerHidePopup() {
    this._btnClose.addEventListener('click', this.toggleOpen.bind(this));
    this._overlay.addEventListener('click', this.toggleOpen.bind(this));
  }
  addHandlerSubmit(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}
export default new AddRecipeView();
