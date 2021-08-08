// the page with saved cards
import React from 'react';
import Navigation from '../Navigation/Navigation';
import NewsCardList from '../NewsCardList/NewsCardList';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './SavedNews.css';

function SavedNews(props) {
  // const currentUser = React.useContext(CurrentUserContext);

  return(
    <main className="content">
      <Navigation
        isLoggedIn={props.isLoggedIn}
        setIsLoggedIn={props.isLoggedIn}
        setCurrentUser={props.setCurrentUser}
        handlePopupSwitch={props.handlePopupSwitch}
        handleLoginClick={props.handleLoginClick}
        handleRegisterClick={props.handleRegisterClick}
        handleEscKey={props.handleEscKey}
        handleSignOut={props.handleSignOut}
      />

      <section className="savednews">
        <div className="savednews__content">
          <span className="savednews__highlight">Saved articles</span>
          <h2 className="savednews__title">
            {/* { currentUser + ", you have '" + props.cardCount + "' saved articles"} */}
            {"Abravi, you have 5 saved articles"}
          </h2>
          <span className="savednews__keywords">By keywords:
            <b>{ " Nature, Yellowstone, and 2 other" }</b>
          </span>
        </div>

        <div className="elements saved__articles">
          <NewsCardList />
        </div>
      </section>
    </main>

  )
}

export default SavedNews;