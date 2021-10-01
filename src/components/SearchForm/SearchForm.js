// the search form for the user to enter their search request
import './SearchForm.css';

function SearchForm(props) {
  const buttonClick = () => {
    document.querySelector('.search__button').style.background = "#2A65CC";
  }

  return (
    <form className="search__form" onSubmit={props.handleSearchSubmit} noValidate>
      <input
        type="text"
        name="search"
        placeholder="Enter topic"
        // value={props.searchRequest}
        onChange={props.handleSearchChange}
        className="search__input"
        required
      />
      <button type="submit" className="search__button" onClick={buttonClick}>Search</button>
    </form>
  )
}

export default SearchForm;