export const getAllPokemon = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`);
  const data = await res.json();

  const { results, next, previous } = data;

  return { results, next, previous };
};
