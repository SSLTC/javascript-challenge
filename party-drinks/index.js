import drinks from "./modules/drinks.js";
import getRndRgb from "./modules/getRndColor.js";
import fetchData from "./modules/fetchData.js";
import { removeAllChildren } from "./modules/rmAllChildElem.js";

const listDrinks = () => {
  drinks.forEach((drink) => {
    createButton(drink);
  });
};

const fetchCocktailData = async (drink) => {
  const cocktailData = await fetchData(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`
  );

  return cocktailData;
};

const calcBlackOrWhiteTextColor = (rgbColor) => {
  let redgreenblue = rgbColor
    .substring(4, rgbColor.lastIndexOf(")"))
    .split(",");
  let red = parseInt(redgreenblue[0]);
  let green = parseInt(redgreenblue[1]);
  let blue = parseInt(redgreenblue[2]);

  let hsp = Math.sqrt(
    0.299 * (red * red) + 0.587 * (green * green) + 0.114 * (blue * blue)
  );

  if (hsp > 127.5) {
    return "black";
  } else {
    return "white";
  }
};

const showInfo = (event) => {
  drinks.forEach((drink) => {
    if (drink.Name === event.target.innerText) {
      switch (drink.Type) {
        case "Cocktail":
          console.log("a cocktail");
          break;
        default:
          console.log("not a cocktail");
          break;
      }

      howToPrepare(drink);
      addToBasket(drink);
      return;
    }
  });
};

const howToPrepare = (drink) => {
  let elPreparation = document.querySelector(".preparation");

  if (elPreparation === null) {
    elPreparation = document.createElement("div");
    elPreparation.classList.add("preparation");
    const elMain = document.querySelector(".main");
    elMain.insertBefore(elPreparation, elMain.lastChild);
  }

  removeAllChildren("preparation");

  switch (drink.Type) {
    case "Soft":
      elPreparation.innerHTML = "Just pour the drink, and you're ready to go!";
      break;
    case "Tea":
      const elUnorderedList = document.createElement("ul");
      const teaPreparation = [
        "Put the kettle on",
        "Get a teaspoon of tea in your cup",
        "Pour the water and wait for a couple of minutes",
        "Enjoy the perfect tea!",
      ];
      teaPreparation.forEach((step) => {
        addListItem(elUnorderedList, step);
      });

      elPreparation.innerHTML = "";
      elPreparation.appendChild(elUnorderedList);
      break;
    case "Cocktail":
      const cocktailData = fetchCocktailData(drink.Name);

      cocktailData.then(
        function (value) {
          const firstResult = value.drinks[0];
          console.log(firstResult);

          const elThumb = document.createElement("img");
          elThumb.setAttribute("src", firstResult.strDrinkThumb + "/preview");
          const elInstructions = document.createElement("p");
          elInstructions.innerText = firstResult.strInstructions;

          elPreparation.append(elThumb, elInstructions);
        },
        function (error) {
          elPreparation.innerHTML =
            "Cocktail preparation instructions not found in our database";
        }
      );
  }
};

const addListItem = (list, text) => {
  const elListItem = document.createElement("li");
  elListItem.innerText = text;
  list.appendChild(elListItem);
};

const addToBasket = (drink) => {
  const elDrink = document.createElement("li");
  elDrink.innerText = drink.Name;
  showBasket(elDrink);
};

const createButton = (drink) => {
  const buttonColor = getRndRgb();
  const elButton = document.createElement("button");
  elButton.classList.add("btnDrinks");
  elButton.setAttribute("type", "button");
  elButton.setAttribute(
    "style",
    "background-color: " +
      buttonColor +
      ";color: " +
      calcBlackOrWhiteTextColor(buttonColor)
  );

  elButton.innerText = drink.Name;
  elButton.value = drink;
  elButton.addEventListener("click", showInfo);
  const elDrinks = document.querySelector(".navDrinks");
  elDrinks.appendChild(elButton);
};

const showBasket = (listItem) => {
  let elBasket = document.querySelector(".basket");
  let elUnorderedList;
  if (elBasket === null) {
    elBasket = document.createElement("div");
    elBasket.classList.add("basket");
    elUnorderedList = document.createElement("ul");
    elBasket.appendChild(elUnorderedList);
    document.querySelector(".main").appendChild(elBasket);
  }
  elUnorderedList = elBasket.firstChild;
  elUnorderedList.appendChild(listItem);
};

const calcTotalPrice = () => {};

listDrinks();
