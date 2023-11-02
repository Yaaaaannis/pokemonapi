import './App.css';
import React, {useState, useEffect} from 'react';
import PokemonSearch from './components/PokemonSearch';

function App() {
  const [pokemon, setPokemon] = useState({
    imageUrl:"",
    name:"",
    number:"",
    types: [],
  })

  const cleanDescription = (description) => {
    let cleanedDescription = description.replace(/(\r\n|\n|\r)/gm, " ");
    cleanedDescription = cleanedDescription.replace(/[^\w\s.,;!?()-]/gi, '');
    return cleanedDescription;
  }


  const [pokemonDescription, setPokemonDescription] = useState ('');

  const fetchPokemonDescription = async (pokemonName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const speciesData = await response.json();
      const englishDescription = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
      if (englishDescription) {
        const cleanedDescription = cleanDescription(englishDescription.flavor_text);
        setPokemonDescription(cleanedDescription);
      }
    } catch (error) {
      console.error("Could not fetch the Pokémon's description: ", error);
    }
  };
  useEffect (() => {
    if (pokemon.name) {
      fetchPokemonDescription(pokemon.name);
    }
  
  }, [pokemon.name])

  const searchPokemon = async (query) => {
    if (!query) return;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setPokemon({
        imageUrl: data.sprites.front_default,
        name: data.name,
        number: data.id,
        types: data.types.map((type) => type.type.name),
      });
      fetchPokemonDescription(data.name);
      
    } catch (error) {
      console.error("Could not fetch the pokemon data: ", error);
      // Vous pouvez gérer les erreurs de recherche ici (e.g., afficher un message)
    }
  };




const changePokemon = async () => {
  try {
    const randomNumber = Math.ceil(Math.random() * 810) +1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    setPokemon ({
      imageUrl: data.sprites.front_default,
      name: data.name,
      number: data.id,
      types: data.types.map((type) => type.type.name),
    });
   
    } catch (error) {
      console.error("Could not fetch the pokemon data: ", error);
    }
   }
useEffect(() => {
  changePokemon();
}, []);

return (
  <>
  <PokemonSearch onSearch={searchPokemon}/>
  <div className='wrapper'>
    <div className='image-wrapper'>
        <img className='image' src={pokemon.imageUrl} alt={pokemon.name || 'pokemon'} />
    </div>
    <div className='header'>
        <div className='number'>
            {pokemon.number}
        </div>
        <div className='name'>
            {pokemon.name}
        </div>
        <div className='types'>
            Type: {pokemon.types}
        </div>
        <div className='description'>
            {pokemonDescription}
        </div>
        <button className='button' onClick={changePokemon}>
          Get A Random Pokemon  
        </button>
    </div>
  </div>
  </>
)

  }

   export default App;