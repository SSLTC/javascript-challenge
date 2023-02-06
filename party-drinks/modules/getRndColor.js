import getRndInteger from "./getRndInteger.js";

const getRndRgb = () => {
  let rndRgb =
    "rgb(" +
    [getRndInteger(0, 255), getRndInteger(0, 255), getRndInteger(0, 255)].join(
      ","
    ) +
    ")";
  // `rgb(${red}, ${green}, ${blue})` Math.floor(Math.random() * 256)
  return rndRgb;
};

export default getRndRgb;
