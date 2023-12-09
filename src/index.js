import { data } from "./cats_and_dogs.js";

// Решение -> 

const TOP_QUANTITY = 5

function compareByRank (a, b) {
  if (a.likes > b.likes) return -1
  if (a.likes < b.likes) return 1
  return 0
}

function compareByRes (a, b) {
  const aRes = a.width * a.height
  const bRes = b.width * b.height

  if (aRes > bRes) return -1
  if (aRes < bRes) return 1
  return 0
}

// Собираем массив и обогащаем id каждую запись
const allPets = Object.values(data).map((value, index) => ({ id: index + 1, ...value }))

// Ранжируем по колличесиву лайков 
const rankedPets = allPets.sort((a, b) => compareByRank(a, b))

const top = rankedPets.slice(0, TOP_QUANTITY).sort((a ,b) => compareByRes(a, b))
const rest = rankedPets.slice(TOP_QUANTITY).sort((a ,b) => compareByRes(a, b))

const result = { top, rest }

console.log('RESULT: ', result) 

// <-


// Проверки
result.top.length !== 5 && console.error("top: Должно быть 5 зверюшек");
result.rest.length !== 10 && console.error("rest: Должно быть 10 зверюшек");

const isDesc = (arr) =>
  arr.reduce(
    (acc, v) => {
      if (acc[0] === false) return acc;
      const prev = acc[1];
      const area = v.width * v.height;
      if (prev < area) {
        return [false, -Infinity];
      }
      return [true, area];
    },
    [true, Infinity]
  );

isDesc(result.top)[0] !== true &&
  console.error("top: Должно быть отсортировано по возрастанию");

isDesc(result.rest)[0] !== true &&
  console.error("rest: Должно быть отсортировано по возрастанию");