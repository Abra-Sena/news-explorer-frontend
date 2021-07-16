// the component that renders the site header on the page
import React from 'react';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';

function Header(props) {
  return(
    <header className="header">
      <Navigation
        isLoggedIn={props.isLoggedIn}
        setIsLoggedIn={props.isLoggedIn}
        setCurrentUser={props.setCurrentUser}
        handlePopupSwitch={props.handlePopupSwitch}
        handleLoginClick={props.handleLoginClick}
        handleRegisterClick={props.handleRegisterClick}
        handleSignoutClick={props.handleSignoutClick}
      />

      <div className="header__container">
        <h1 className="header__title">What's going on in the world?</h1>
        <p className="header__paragraph">Find the latest news on any topic and save them in your personal account.</p>
        <SearchForm />
      </div>
    </header>
  )
}

export default Header;