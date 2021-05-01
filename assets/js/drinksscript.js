// MOVIE MIXER LOGIC


//====================== LOGIC AND RUN ======================//

// open items! SORRY THIS IS A MESS IDK WHERE TO PUT NOTES
// add drop down event listeners (to drop down menu, to grab user selection)
//create elements/display results and buttons (should we hide drop down?)
//add event listeners to buttons
	//if user clicks hail nah, rerun


//placeholder value
var userSelection = "vodka"; 
var drinkResultEl = document.querySelector('#drink-display')

//pick cocktail based on user choice, grab drink ID
var randomDrink = function (selection) {
	fetch("https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + selection, {
		method: "GET",
		headers: {
			"x-rapidapi-key": "30f04bca87mshb6f84916c7e0709p18c5ebjsne207a2d1ce23",
			"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
		},
	})
		.then(function (response) {
			response.json().then(function (data) {
			// console.log(data);
			// console.log(data.drinks)

				//pick random
				var drinkChoice = data.drinks[Math.floor(Math.random()*data.drinks.length)];
				var id = drinkChoice.idDrink;
				getDrinkInstr(id);
			});
		})
		.catch((err) => {
			console.error(err);
		});
};

randomDrink(userSelection);

//pull detail based on drink ID
var getDrinkInstr = function (id) {
	fetch("https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + id , {
		method: "GET",
		headers: {
			"x-rapidapi-key": "30f04bca87mshb6f84916c7e0709p18c5ebjsne207a2d1ce23",
			"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
		},
	})
		.then(function (response) {
			response.json().then(function (data) {
				console.log(data);
				var drink = parseDrinkResponse(data);
                displayDrink (drink);
				console.log(parseCocktails);
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
    console.log('drinkname');
    console.log(drink.ingredients)

    //pull ingredient data into html
    for (var i=0; i< drink.ingredients.length; i++) {
        let ingredientsDisplay = $("<p>").text(drink.ingredients[i]).appendTo($("#ingredients"));
    };
}

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
		if(measurement == null) {
			measurement = ""
			drink.ingredients.push(ingredient);
		} else if (ingredient !== null && measurement !== "") {
			drink.ingredients.push(measurement + " " + ingredient);
		}
        //remove any extra/null indexes
		drink.ingredients = drink.ingredients.filter(function (index) {
			return index !== null;
		})
		}
		return drink;
	}