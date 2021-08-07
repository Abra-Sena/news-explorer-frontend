/* eslint-disable no-restricted-globals */
// the components of the main page
import React from 'react';
import About from '../About/About';
import Navigation from '../Navigation/Navigation';
import NewsCardList from '../NewsCardList/NewsCardList';
import NotFounded from '../NotFounded/NotFounded';
import Preloader from '../Preloader/Preloader';
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
        {/* <NotFounded /> */}

        {/* <Preloader /> */}

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