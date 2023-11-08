import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import pokemons from "./pokemon/pokemon.json";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import { getColors } from "./utils/ReturnCardColor";
import Header from "./components/Header/Header.js";
const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
  
  }
`;
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  justify-items: center;
`;
function App() {
  const [pesquisa, setPesquisa] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [tipoDePokemon, setTipoDePokemon] = useState("");
  const [order, setOrder] = useState("");

  return (
    <>
      <GlobalStyle />
      <Header
        idFilter={idFilter}
        setIdFilter={setIdFilter}
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        tipoDePokemon={tipoDePokemon}
        setTipoDePokemon={setTipoDePokemon}
        order={order}
        setOrder={setOrder}
        
      />
      <CardsContainer>
        {pokemons.filter((pokemon) => {
          return idFilter ? pokemon.id.includes(idFilter) : pokemon
        })

          .sort((a, b) => {
           const compareResult = a.name.english.localeCompare(b.name.english);
            return order === "desc" ? -compareResult : compareResult;
          })

      

          .filter((pokemon) => {
            return pokemon.name.english.toLowerCase().includes(pesquisa.toLowerCase());
          })

          .filter((pokemon) => {
            if (tipoDePokemon.length === 0 ){
              return true;
            } else {
              return pokemon.type.includes(tipoDePokemon)
            }
            //return tipoDePokemon ? pokemon.type.includes(tipoDePokemon) : pokemon
          })

          
          .map((pokemon) => {
            return (
              <PokemonCard
                cardColor={getColors(pokemon.type[0])}
                key={pokemon.id}
                pokemon={pokemon}
              />
            );
          })}
      </CardsContainer>
    </>
  );
}

export default App;
