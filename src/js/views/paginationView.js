import Views from './Views.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends Views {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const page = +btn.dataset.togo;
      handler(page);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //     <button class="btn--inline pagination__btn--prev">
    //     <svg class="search__icon">
    //       <use href="src/img/icons.svg#icon-arrow-left"></use>
    //     </svg>
    //     <span>Page 1</span>
    //   </button>
    //   <button class="btn--inline pagination__btn--next">
    //     <span>Page 3</span>
    //     <svg class="search__icon">
    //       <use href="src/img/icons.svg#icon-arrow-right"></use>
    //     </svg>
    //   </button>
    // Page =1 ,and there are more
    if (curPage === 1 && numPages > 1)
      return `
    <button data-togo="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
         <span>Page ${curPage + 1}</span>
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
         </svg>
       </button>
    `;
    //Last page
    if (curPage === numPages && numPages > 1) {
      return `
    <button data-togo="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-left"></use>
         </svg>
         <span>Page ${curPage - 1}</span>
       </button>
    `;
    }
    //Other pages
    if (curPage < numPages && curPage > 1) {
      return `
          <button data-togo="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
        <button data-togo="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
        `;
    }
    // page = 1 and there are no other pages
    return '';
  }
}
export default new PaginationView();
