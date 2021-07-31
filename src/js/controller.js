import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeViews.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    await model.loadRecipe(id);

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.handlError();
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPaginationView = function (page) {
  resultsView.render(model.getSearchResultsPage(page));

  paginationView.render(model.state.search);
};
const controlServings = function (btnTo) {
  model.updateServings(btnTo);
  // Updating view
  recipeView.update(model.state.recipe);
};
const controlAddBookmarks = function () {
  // add or remove a recipe
  if (!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // update a recipe
  recipeView.update(model.state.recipe);
  //render bookmark
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    addRecipeView.handleMessage();
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', model.state.recipe.id);
    setTimeout(function () {
      addRecipeView.toggleOpen();
    }, MODAL_CLOSE_SEC * 1000);
    console.log('Forkify Project');
  } catch (err) {
    console.error(err);
    addRecipeView.handlError(err.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerSearch(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPaginationView);
  recipeView.addHandlerAddBookmark(controlAddBookmarks);
  addRecipeView.addHandlerSubmit(controlAddRecipe);
};
init();
