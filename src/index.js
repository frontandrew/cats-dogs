import { catAndDogFetcher, magicalCatRecognizer } from "./lib.js";

const getCats = async () => {
  // Решение ===

  const TOP_QUANTITY = 3;

  const pets = await catAndDogFetcher.fetchAll();
  console.log(`allPets:`, pets);

  const recognizedPets = await Promise.all(
    pets.map((pet) => magicalCatRecognizer.recognize(pet))
  );

  const cats = pets
    .filter((pet, index) => recognizedPets[index])
    .slice(0, TOP_QUANTITY);

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
