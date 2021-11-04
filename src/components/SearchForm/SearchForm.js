// the search form for the user to enter their search request
import './SearchForm.css';

function SearchForm(props) {
  const buttonClick = function () {
    document.querySelector('.search__button').style.background = "#2A65CC";
  }

  return (
    <form className="search__form" onSubmit={props.handleSearchSubmit} noValidate>
      <input
        type="text"
        name="search"
        placeholder="Enter topic"
        value={props.searchRequest ? props.searchRequest : ''} // this fix having false on page refresh
        onChange={props.handleSearchChange}
        className="search__input"
        required
      />
      <button type="submit" className="search__button" onClick={buttonClick}>Search</button>
    </form>
  )
}

export default SearchForm;