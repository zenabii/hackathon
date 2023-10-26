import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";

const PokedexContext = createContext<any>({

});

async function fetchGraphQL(query, variables, operationName) {
    const result = await fetch(
      "https://beta.pokeapi.co/graphql/v1beta",
      {
        method: "POST",
        body: JSON.stringify({
          query: query,
          variables: variables,
          operationName: operationName
        })
      }
    )
  
    return await result.json()
  }

const fetchPokemon_all = () => {
    const query = `
    query samplePokeAPIquery {
        pokemon_v2_pokemon {
            name
            id
        }
        }
    `

    return fetchGraphQL(
        query,
        {"name": name},
        "pokemon_details"
    )
}

interface PokeApiWrapperProps {}

const PokedexWrapper = ({children}: PropsWithChildren<PokeApiWrapperProps>) => {
    const [allPokemons, setAllPokemons] = useState([]);

    const getAllPokemons = useCallback(async () => {
        const { errors, data } = await fetchPokemon_all()
        setAllPokemons(data); // <== pokemon respons
    })
    const getDetails = useCallback((name) => {
        // api call get all pokemon
    }, []);

    useEffect(() => {
        getAllPokemons();
    }, [getAllPokemons]);
    
    return (
        <PokedexContext.Provider value={{
            allPokemons,
            getDetails,
        }}>
            {children}
        </PokedexContext.Provider>
    );
};

export const useJourneyContext = () => {
    return useContext(PokedexContext);
};

export default PokedexWrapper;
