const pokemonNameOrId = args[0]

const pokemonRequest = Functions.makeHttpRequest({
  url: `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}/`
});
console.log(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}/`);

const response = await pokemonRequest;
console.log(response);

if (response.error) {
  throw Error("Failed to fetch Pokémon stats");
}

const statsMap = {
  'attack': 'a',
  'defense': 'd',
  'hp': 'h',
  'special-attack': 'sa',
  'special-defense': 'sd',
  'speed': 's'
};

const statsObj = response.data.stats.reduce((acc, curr) => {
  const shortKey = statsMap[curr.stat.name];
  if (shortKey) {
    acc[shortKey] = curr.base_stat;
  }
  return acc;
}, {});

console.log(`Pokemon name: ${response.data.name}`);
console.log(`Pokemon image URL: ${response.data.sprites.other["official-artwork"].front_default}`);

// I'm assuming you want to return the stats object, 
// but you can adjust this based on your requirements.
return Functions.encodeString(JSON.stringify(statsObj));


  