const getRndInteger = (min, max) => {
  let rndInt = Math.floor(Math.random() * (max - min + 1)) + min;
  return rndInt;
};

export default getRndInteger;
