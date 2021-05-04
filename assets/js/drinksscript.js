//VARIABLES
let favoriteArray = [];
let drink = {};
var userInput;
var drinkResultEl = document.querySelector("#drink-display");
var rerunBtnEl = document.querySelector("#rerun");
let favoriteEl = document.querySelector("#fave-icon");
//====================== LOGIC AND RUN ======================//

//grab user input from drop down menu
var getUserSelection = function (event) {
  console.log(event);
  userInput = event.target.innerText.trim();
  console.log(userInput);
  randomDrink(userInput);
};

//pick cocktail based on user input, grab drink ID
var randomDrink = function (input) {
  fetch("https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + input, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "30f04bca87mshb6f84916c7e0709p18c5ebjsne207a2d1ce23",
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
    },
  })
    .then(function (response) {
      response.json().then(function (data) {
        console.log(data);
        // console.log(data.drinks)

        //pick random
        var drinkChoice =
          data.drinks[Math.floor(Math.random() * data.drinks.length)];
        var id = drinkChoice.idDrink;
        getDrinkInstr(id);
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// randomDrink(userSelection);

//pull detail based on drink ID
var getDrinkInstr = function (id) {
  fetch("https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + id, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "30f04bca87mshb6f84916c7e0709p18c5ebjsne207a2d1ce23",
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
    },
  })
    .then(function (response) {
      response.json().then(function (data) {
        console.log(data);
        drink = parseDrinkResponse(data);
        //clear old ingredients div if user makes different selection
        $("#ingredients").empty();
        displayDrink(drink);
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

//Display Drink data
var displayDrink = function (drink) {
  // console.log("test this");
  // console.log(drink);

  $("#drinkImg").attr("src", drink.img);
  $("#drinkName").text(drink.name);
  $("#drink-recipe").text(drink.instruction);
  // console.log("drinkname");
  // console.log(drink.ingredients);

  //pull ingredient data into html
  for (var i = 0; i < drink.ingredients.length; i++) {
    let ingredientsDisplay = $("<p>")
      .text(drink.ingredients[i])
      .appendTo($("#ingredients"));
  }
};

//grab details, turn into drink object
var parseDrinkResponse = function (response) {
  var drinkDetails = response.drinks[0];
  var drink = {};
  drink.name = drinkDetails.strDrink;
  drink.instruction = drinkDetails.strInstructions;
  drink.img = drinkDetails.strDrinkThumb;

  //concat measurement/ingredients not null and push to array
  drink.ingredients = [];
  for (var i = 1; i <= 15; i++) {
    var ingredient = drinkDetails["strIngredient" + i];
    var measurement = drinkDetails["strMeasure" + i];
    if (measurement == null) {
      measurement = "";
      drink.ingredients.push(ingredient);
    } else if (ingredient !== null && measurement !== "") {
      drink.ingredients.push(measurement + " " + ingredient);
    }
    //remove any extra/null indexes
    drink.ingredients = drink.ingredients.filter(function (index) {
      return index !== null;
    });
  }
  return drink;
};

//event listener to rerun based on last user selection
rerunBtnEl.addEventListener("click", function () {
  $("#ingredients").empty();
  randomDrink(userInput);
  favoriteEl.classList.add("far");
  favoriteEl.classList.remove("fas");
});

//save favorite
var toggleFavorite = function (favorite) {
  favorite.classList.toggle("fas");
  console.log(favoriteEl);

  if (favoriteEl.classList.contains("fas")) {
    favoriteArray.push(drink);
    console.log(favoriteArray);
  }
  localStorage.setItem("savedDrinks", JSON.stringify(favoriteArray));
};

//display saved Drinks
