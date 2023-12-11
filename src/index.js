import { catAndDogFetcher, magicalCatRecognizer } from "./lib.js";

const getCats = async () => {
  // Решение ===

  const pets = await catAndDogFetcher.fetchAll();
  console.log(`allPets:`, pets);

  // по факту сортировка cats происходит после вычесления результата getCats()
  // из-за чего в cats попадают все pets?
  // как использовать async await, чтобы до возвращения результата
  // getCats() дождаться выполнения cats

  // const recognizedCats = async (animals) =>
  //   animals.filter(async (animal) => {
  //     const res = await magicalCatRecognizer.recognize(animal);

  //     console.log(`fitler(ID: ${animal.id}):`, res);
  //     return res;
  //   });

  // const cats = await recognizedCats(pets);

  // решение 2

  const TOP_QUANTITY = 3;

  const recognizedPets = await Promise.all(
    pets.map((pet) => magicalCatRecognizer.recognize(pet))
  );

  const cats = pets
    .filter((pet, index) => recognizedPets[index])
    .slice(0, TOP_QUANTITY);

  console.log(`setCats(res):`, { cats, pets });
  return cats;

  // ===
};
const run = async () => {
  let topRatedCats;
  try {
    topRatedCats = await getCats();
  } catch (err) {
    console.error(err);
  }

  // Проверки
  topRatedCats?.length !== 3 && console.error("Должно быть 3 котика");
  !topRatedCats?.find((c) => c.id === "3") &&
    console.error("Третий котик должен быть в топе!");
};

run();
