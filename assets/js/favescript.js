// load favorite drinks
var loadFavorites = function() {
    favoriteDrinkArray = JSON.parse(localStorage.getItem("savedDrinks"));
    console.log(favoriteDrinkArray);
    if (favoriteDrinkArray) {
        $("#addDrinkFavorite").addClass("hidden");
        displayDrinkFavorites();
    }
  }
  
  //display drink favorites
  var displayDrinkFavorites = function () {
    for (var i = 0; i < favoriteDrinkArray.length; i++) {
      if(favoriteDrinkArray[i]) {
        let drinkFaveContainer = $("#drinkFave" + i)
        drinkFaveContainer.removeClass("hidden");
        let drinkFaveImg = $("<img>")
        drinkFaveImg.attr("src", favoriteDrinkArray[i].img)
        drinkFaveContainer.append(drinkFaveImg);
        let drinkFaveName = $("<h4>")
        drinkFaveName.text(favoriteDrinkArray[i].name).appendTo(drinkFaveContainer);
      }}}
//load favorite movies
var loadFavoriteMovie = function() {
  //gets item from local storage and saves to an array
  favoriteMovieArr = JSON.parse(localStorage.getItem("savedMovies"));
  console.log(favoriteMovieArr)
  if(favoriteMovieArr) {
    $("#addMovieFavorite").addClass("hidden");
    displayMovieFavorites();
  }}
//renders from local storage​
var displayMovieFavorites = function() {
 for (var i=0; i < favoriteMovieArr.length; i++) {
  if (favoriteMovieArr[i]) {
  let movieFaveContainer = $("#movieFave" + i);
   movieFaveContainer.removeClass("hidden");
   let movieFaveImg = $("<img>")
   movieFaveImg.attr("src", favoriteMovieArr[i].imageurl[0]).appendTo(movieFaveContainer);
   console.log(favoriteMovieArr[i].imageurl[0]);
   let movieFaveName =  $("<h4>")
   movieFaveName.text(favoriteMovieArr[i].title).appendTo(movieFaveContainer);
  }}}
loadFavorites();
loadFavoriteMovie();