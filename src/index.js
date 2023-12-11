import { data } from "./cats_and_dogs.js";

const catsAndDogs = Object.entries(data)
  .reduce((acc, [id, value]) => [...acc, { ...value, id }], [])
  .sort((a1, a2) => (a1.likes > a2.likes ? -1 : 1));

const result = {
  top: catsAndDogs
    .slice(0, 5)
    .sort((a1, a2) => (a1.width * a1.height > a2.height * a2.width ? -1 : 1)),
  rest: catsAndDogs
    .slice(5)
    .sort((a1, a2) => (a1.width * a1.height > a2.height * a2.width ? -1 : 1)),
};

console.log(result);

// Решение ===

const { top = [], rest = [] } = result;

function getAnimalEl({ filename }) {
  const item = document.createElement("li");
  const img = document.createElement("img");

  img.src = filename;
  item.appendChild(img);

  console.log(`ANIMAL ELEM:`, item, { item });
  return item;
}

const topBox = document.getElementsByClassName("animals-top")[0];
const restBox = document.getElementsByClassName("animals-rest")[0];

top.forEach(function (item) {
  topBox.appendChild(getAnimalEl(item));
});
rest.forEach(function (item) {
  restBox.appendChild(getAnimalEl(item));
});

// ===

// Проверки
const images = [...document.querySelectorAll("img")]
  .map((e) => e.outerHTML.match(/data\/(.*).png*/))
  .filter(Boolean);

images.length !== 15 && console.error("На странице должно быть 15 изображений");
