/* eslint-disable no-restricted-globals */
// the components of the main page
import React from 'react';
import Navigation from '../Navigation/Navigation';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './Main.css';

function Main(props) {
  // const currentUser = React.useContext(CurrentUserContext);


  return (
    <main className="content">
      <Navigation
        isLoggedIn={props.isLoggedIn}
        setIsLoggedIn={props.isLoggedIn}
        setCurrentUser={props.setCurrentUser}
        handlePopupSwitch={props.handlePopupSwitch}
        handleLoginClick={props.handleLoginClick}
        handleRegisterClick={props.handleRegisterClick}
        handleEscKey={props.handleEscKey}
        handleSignoutClick={props.handleSignoutClick}
      />

      <section className="search">
        <div className="elements">
          <h2 className="elements__title">Search results</h2>
          <NewsCardList />
          <button className="elements__more">Show more</button>
        </div>
      </section>

      <About />
    </main>
  )
}

export default Main;