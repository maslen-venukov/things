function getRandomBetween(min, max) {
  return Math.trunc(Math.random() * (max - min + 1) + min)
};

console.log(getRandomBetween(2, 4));