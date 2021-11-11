// the component that renders the site header on the page
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';

function Header(props) {
  return(
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">What's going on in the world?</h1>
        <p className="header__paragraph">Find the latest news on any topic and save them in your personal account.</p>
        <SearchForm
          isServerError={props.isServerError}
          searchRequest={props.searchRequest}
          handleSearchChange={props.handleSearchChange}
          handleSearchSubmit={props.handleSearchSubmit}
        />
      </div>
    </header>
  )
}

export default Header;