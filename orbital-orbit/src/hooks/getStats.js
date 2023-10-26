
const getStatsById = async ( id ) => {
  const query = `
  query pokemon_details($id: Int) {
    pokemon_v2_pokemonstat_aggregate(where: {pokemon_v2_pokemon: {id: {_eq: $id}}}) {
      nodes {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
    }
}
  `
  const response = await fetch(
    "https://beta.pokeapi.co/graphql/v1beta",
    {
      method: "POST",
      body: JSON.stringify({
      query,
      variables: {id},
      operationName: "pokemon_details"
      })
    }
  );
  const pokedex = await response.json();
  const pokemon = pokedex;
  console.log(pokemon.data.pokemon_v2_pokemonstat_aggregate.nodes)
  return pokemon.data.pokemon_v2_pokemonstat_aggregate.nodes
}

export default getStatsById