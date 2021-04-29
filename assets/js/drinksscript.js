// MOVIE MIXER LOGIC
//====================== VARIABLES ======================//

//====================== RANDOM DRINK ======================//
    //WHEN THE PAGE LOADS
    USER PRESENTED WITH AN ALCOHOL OPTION DROPDOWN 
    USER WILL SELECT ONE OF THE CHOICES IN THE LIST


// WHEN AN ALCOHOL OPTION IS SELECTED
function randomDrink() {}
    A DRINK OPTION WILL DISPLAY
    RECIPE WILL DISPLAY
        - IF THE USER IS SATISFIED WITH THE DRINK CHOICE 
            - DO NOTHING 

        - IF THE USER IS NOT SATISFIED WITH THE DRINK CHOICE
            - WHEN USER CLICKS THE TRY AGAIN BUTTON, A NEW OPTION WILL BE DISPLAYED 

// WHEN USER SELECTS A NEW ALCOHOL OPTION
    RUN THE randomDrink FUNCTION AGAIN


//====================== LOGIC AND RUN ======================//

// open items! SORRY THIS IS A MESS IDK WHERE TO PUT NOTES
// add drop down event listeners (to drop down menu, to grab user selection)
//create elements/display results and buttons (should we hide drop down?)
//add event listeners to buttons
//if user clicks hail nah, rerun


//placeholder value
var userSelection = "vodka"; 
randomDrink(userSelection);

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
            var parseCocktails = parseDrinkResponse(data);
            console.log(parseCocktails);
        });
    })
    .catch((err) => {
        console.error(err);
    });
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