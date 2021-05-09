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
        let drinkFaveImg = $("<img>").attr("src", favoriteDrinkArray[i].img).appendTo(drinkFaveContainer);
        let drinkFaveName = $("<h4>").text(favoriteDrinkArray[i].name).appendTo(drinkFaveContainer);
      }
  }
  }
​
​
  //load favorite movies
var loadFavoriteMovie = function() {
  //gets item from local storage and saves to an array
  favoriteMovieArr = JSON.parse(localStorage.getItem("savedMovies"));
  console.log(favoriteMovieArr)
  if(favoriteMovieArr) {
    $("#addMovieFavorite").addClass("hidden");
    displayMovieFavorites();
  }
}
​
var displayMovieFavorites = function() {
 for (var i=0; i < favoriteMovieArr.length; i++) {
   let movieFaveContainer = $("#movieFave" + i);
   movieFaveContainer.removeClass("hidden");
   let movieFaveImg = $("<img>").attr("src", favoriteMovieArr[i].imageurl[0]).appendTo(movieFaveContainer);
   console.log(favoriteMovieArr[i].imageurl[0]);
   let moveiFaveName = $("<h4>").text(favoriteMovieArr[i].title).appendTo(movieFaveContainer);
​
 }
}
​
loadFavorites();
loadFavoriteMovie();