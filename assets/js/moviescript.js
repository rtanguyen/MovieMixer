//variables
var userGenre = '2'
//dom elements
var movieResultEl = document.querySelector('#movie-display')

//get userinput translate to API genre numbers
//function runs with a hardcoded endpoint, need to add random feature, or grab a random movie from the list
//for loop to cycle through movie results API displays multiple movies 'per page'
//add event listeners to buttons
    //if user clicks hail nah, rerun
function fetchMovie() {
  fetch("https://streaming-availability.p.rapidapi.com/get/basic?country=us&tmdb_id=movie%2F120", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "34dff35736msh55aa38c64ff1987p1a7defjsn975b941ff55a",
		"x-rapidapi-host": "streaming-availability.p.rapidapi.com"
	}
        })
        .then(response => response.json()) 
        .then(data => {         
           renderMoviesData(data)
        })
        .catch(err => {
            console.log(err);
        });  
}
//this function renders the api result
function renderMoviesData(data) {
    var movieTitle = data.title
    console.log(movieTitle)
    var movieDescription = data.overview
    console.log(movieDescription)
    //creating necessary elements
    const movieTitleDisplay = document.createElement('h2')
    const descriptionDisplay = document.createElement('p')
    //grab data and insert into html
    movieTitleDisplay.innerHTML = movieTitle
    descriptionDisplay.innerHTML = movieDescription
    //append to movie display container
    movieResultEl.appendChild(movieTitleDisplay);
    movieResultEl.appendChild(descriptionDisplay)
    
}
fetchMovie();



//if user selects <streaming service> displays <streaming service logo>

//DOM event listeners
