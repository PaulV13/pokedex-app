export const getPokemon = async (name) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: "No se encontro ningun pokemon" };
  }
};
