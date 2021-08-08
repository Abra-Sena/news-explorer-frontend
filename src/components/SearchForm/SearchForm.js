// the search form for the user to enter their search request
import { useState } from 'react';
import './SearchForm.css';

function SearchForm() {
  const [searchRequest, setSearchRequest] = useState('');
  const buttonClick = () => {
    document.querySelector('.search__button').style.background = "#2A65CC";
  }

  function handleSearchSubmit(evt) {
    evt.preventDefault();

    return setSearchRequest('');
  }

  function handleSearchChange(evt) {
    evt.preventDefault();

    return setSearchRequest(evt.target.value);
  }

  return (
    <form className="search__form" onSubmit={handleSearchSubmit} noValidate>
      <input
        type="text"
        name="search"
        value={searchRequest}
        placeholder="Enter topic"
        onChange={handleSearchChange}
        className="search__input"
        required
      />
      <button type="submit" className="search__button" onClick={buttonClick}>Search</button>
    </form>
  )
}

export default SearchForm;