//VARIABLES
let favoriteDrinkArray = [];
let drink = {};
var userInput;
var drinkResultEl = document.querySelector("#drink-display");
var rerunEl = document.querySelector("#rerun");
let favoriteEl = document.querySelector("#fave-icon");
//====================== LOGIC AND RUN ======================//

//grab user input from drop down menu
var getUserSelection = function (event) {
  console.log(event);
  userInput = event.target.innerText.trim();
  console.log(userInput);
  randomDrink(userInput);

  document.querySelector("#pypID").innerHTML = userInput
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
  $("#drink-container").removeClass("hidden");
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
rerunEl.addEventListener("click", function () {
  $("#ingredients").empty();
  randomDrink(userInput);
  favoriteEl.classList.add("far");
  favoriteEl.classList.remove("fas");
});

//toggle favorite
var toggleFavorite = function (favorite) {
  favorite.classList.toggle("fas");
  console.log(favoriteEl);
  saveFavorite(drink);
  localStorage.setItem("savedDrinks", JSON.stringify(favoriteDrinkArray));
};

//save favorite
var saveFavorite = function(drink) {
  if (favoriteEl.classList.contains("fas")) {
    favoriteDrinkArray.push(drink);
    console.log(favoriteDrinkArray);
    //if user unstars drink, removes last object from array
  } else if (favoriteEl.classList.contains("far")) {
    favoriteDrinkArray.pop();
}
};

// DRINKS TABS

const tabs = document.querySelectorAll('.tabs li');
const tabContentBoxes = document.querySelectorAll('#tab-content > div');

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        tabs.forEach(item => item.classList.remove('is-active'))
        tab.classList.add('is-active')

        const contentTab = tab.dataset.target;
        console.log(contentTab);
        tabContentBoxes.forEach(box => {
          if (box.getAttribute('id') === contentTab) {
            box.classList.remove('is-hidden');
          } else {
            box.classList.add('is-hidden');
          }
        });
    })
})