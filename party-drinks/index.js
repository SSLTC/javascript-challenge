import drinks from "./modules/drinks.js";
import getRndRgb from "./modules/getRndColor.js";

const listDrinks = () => {
  drinks.forEach((drink) => {
    createButton(drink);
  });
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

      return;
    }
  });
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

listDrinks();
