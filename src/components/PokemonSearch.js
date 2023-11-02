import React, {useState} from 'react';
import './PokemonSearch.css';

function PokemonSearch({onSearch}) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
        setSearchTerm('');
    };

    return (
        <form className='search-bar' onSubmit={handleSearchSubmit}>
            <input 
            type='text'
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder='Search For a Pokemon'
            />
            <button type='submit'>Search</button>
        </form>
    )


}


export default PokemonSearch;