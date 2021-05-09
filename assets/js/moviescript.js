//variables
var userInput;
let favoriteArray = [];
var movieChoice = {};
//dom elements on movie html
var movieResultEl = document.querySelector("#movie-display");
var rerunEl = document.querySelector("#rerun");
let favoriteBtnEl = document.querySelector("#fave-icon");
var saveBtnEl = document.querySelector("#saverun");
//dom elements on rewind html
var favMovieEl = document.querySelector('#movieFavorites')

//grab user input from drop down for movie service selector
var getUserSelection = function (event) {
  console.log(event);
  userInput = event.target.innerText.trim();
  console.log(userInput);
  fetchMovie(userInput);
};
//fetches a movie based on genre by user input
function fetchMovie(userInput) {
  fetch(
    "https://ott-details.p.rapidapi.com/advancedsearch?start_year=2010&end_year=2021&min_imdb=6&max_imdb=10&genre=" +
      userInput +
      "&language=english&type=movie&sort=latest&page=1",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "34dff35736msh55aa38c64ff1987p1a7defjsn975b941ff55a",
        "x-rapidapi-host": "ott-details.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      movieChoice =
        data.results[Math.floor(Math.random() * data.results.length)];
      console.log(movieChoice);
      console.log(typeof movieChoice);
      // clear old movie div if user makes different selection
      $("#movie-display").empty();
      renderMoviesData(movieChoice);
    })
    .catch((err) => {
      console.log(err);
    });
}

//this function renders the api result
function renderMoviesData(movieChoice) {
  //   var movie = {};
  //render movie title
  var movieTitle = movieChoice.title;
  console.log(movieTitle);
  //render movie synopsis
  var movieSynopsis = movieChoice.synopsis;
  console.log(movieSynopsis);
  //render movie rating
  var movieRating = movieChoice.imdbrating;
  console.log(movieRating);
  //remder movie img url
  var movieImg = movieChoice.imageurl[0];
  console.log(movieImg);
  //creating necessary elements
  const movieTitleDisplay = document.createElement("h2");
  const descriptionDisplay = document.createElement("p");
  const movieRatingDisplay = document.createElement("h2");
  //img creation
  const movieImgDisplay = document.createElement("img");
  movieImgDisplay.setAttribute("src", movieImg);
  movieImgDisplay.setAttribute("alt", "movie rendered image");
  movieImgDisplay.setAttribute('class', 'movie-img')
  //setAttribute
  movieTitleDisplay.setAttribute('class', 'movie-title');
  descriptionDisplay.setAttribute('class', 'movie-description');
  movieRatingDisplay.setAttribute('class', 'movie-rating')
  //grab data and insert into html
  movieTitleDisplay.innerHTML = movieTitle;
  descriptionDisplay.innerHTML = "Brief synopsis: " + movieSynopsis;
  movieRatingDisplay.innerHTML = "IMDB Rating of " + movieRating;
  //append to movie display container
  movieResultEl.appendChild(movieImgDisplay);
  movieResultEl.appendChild(movieTitleDisplay);
  movieResultEl.appendChild(descriptionDisplay);
  movieResultEl.appendChild(movieRatingDisplay);
}
//reroll for a different movie
rerunEl.addEventListener("click", function () {
  $("#movie-display").empty();
  fetchMovie(userInput);
});

//save favorite
function toggleFavorite(favorite) {
  favorite.classList.toggle("fas");
  console.log(favoriteBtnEl);

  if (favoriteBtnEl.classList.contains("fas")) {
    favoriteArray.push(movieChoice);
    console.log(favoriteArray);
  }
  localStorage.setItem("savedMovies", JSON.stringify(favoriteArray));
}
//save favorite to favoriteMovieArr
function savedFavoriteMovie(movie) {
   if (favoriteBtnEl.classList.contains("fas")) {
    favoriteMovieArr.push(movie);
    console.log(favoriteMovieArr);
    //if user unstars drink, removes last object from array
  } else if (favoriteBtnEl.classList.contains("far")) {
    favoriteMovieArr.pop();
}
};
 

// //load favorites
// function loadFavoriteMovie() {
//   //gets item from local storage and saves to an array
//   favoriteMovieArr = JSON.parse(localStorage.getItem("savedMovies"));
//   console.log(favoriteMovieArr)
//   // if (localStorage.getItem('savedMovies') != null){
//   //   displayFavoriteMovies();
//   // }
// }

// function displayFavoriteMovies() {
//  for (var i=0; i < favoriteMovieArr.length; i++) {
//    var favMovieTitle = favoriteMovieArr[i].title
//    console.log(favMovieTitle)
// // $('#movie-favorites').append(localStorage.getItem(favoriteMovieArr[i].title))
//    //creates element
//     const favMovieTitleDisplay = document.createElement('h3')
//    //grab from local storage
//    favMovieTitleDisplay.innerHTML = favMovieTitle
//     favMovieEl.appendChild(favMovieTitleDisplay)
//   // var favMovieImg = favoriteMovieArr[i]
//  }
// }


fetchMovie();
// loadFavoriteMovie();
// displayFavoriteMovies();