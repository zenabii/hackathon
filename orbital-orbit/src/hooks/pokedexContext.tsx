import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";

const PokedexContext = createContext<any>({

});

interface PokeApiWrapperProps {}

const PokedexWrapper = ({children}: PropsWithChildren<PokeApiWrapperProps>) => {
    const [allPokemons, setAllPokemons] = useState([]);

    const getAllPokemons = useCallback(() => {
        // api call get all pokemon
        setAllPokemons(); // <== pokemon respons
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
