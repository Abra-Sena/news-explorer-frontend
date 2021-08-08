/* eslint-disable no-restricted-globals */
// component responsible for the navigation menu
import React from 'react';
import { useRouteMatch, NavLink } from 'react-router-dom';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import logout from '../../images/logout.svg';
import closeIconW from '../../images/close-white.png';
import closeIconB from '../../images/close-black.png';
import menuIconW from '../../images/menu-black.png';
import menuIconB from '../../images/menu-white.png'

import './Navigation.css';

function Navigation(props) {
  // const currentUser = React.useContext(CurrentUserContext);
  const currentPath = useRouteMatch('/saved-news');
  const savedPageColor = {color: currentPath ? '#000000' : '#FFFFFF'};
  const [isMobileNavOpen, setMobileNavOpen] = React.useState(false);
  const screenWidth = screen.width;
  const icons = (
    currentPath
      ? isMobileNavOpen ? closeIconB : menuIconB
      : isMobileNavOpen ? closeIconW : menuIconW
  )
  const navShadow = (
    screenWidth > 700
      ? currentPath ? 'inset 0px -1px 0px #D1D2D6' : 'inset 0px -1px 0px rgba(255, 255, 255, 0.2)'
      : ''
  )
  const navBackground = (
    screenWidth < 700
      ? isMobileNavOpen ? 'rgba(0, 0, 0, 0.5)' : ''
      : currentPath ? '#FFFFFF' : 'rgba(196, 196, 196, 0.01)'
  )
  const handleMobileNav = () => {
    console.log('request to open mobile nav');
    setMobileNavOpen(true);
  }
  const closeMobileNav = (evt) => {
    if(screenWidth < 700) {
      console.log('request to close mobile nav');

      if(evt.target !== evt.currentTarget) return;
      if(evt.which === 27) setMobileNavOpen(false);

      setMobileNavOpen(false);
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', closeMobileNav);

    return () => document.removeEventListener('keydown', closeMobileNav);
  });


  return (
    <nav
      onClick={closeMobileNav}
      style={{
        boxShadow: navShadow ,
        backgroundColor: navBackground
      }}
      className= {`navigation ${isMobileNavOpen ? "navigation_mobile": "navigation_other"}`}
    >
      {
        screenWidth < 700
        ?
          <div
            className="navigation__content"
            style={{backgroundColor: isMobileNavOpen ? currentPath ? '#FFFFFF': '#000000' : ''}}
          >
            <div
              className="navigation__headline"
              style={{boxShadow: currentPath ? 'inset 0px -1px 0px #D1D2D6' : 'inset 0px -1px 0px rgba(255, 255, 255, 0.2)'}}
            >
              <NavLink exact to='/' style={savedPageColor} className="navigation__title">News Explorer</NavLink>
              <img
                src={icons}
                alt="mobile-menu-btn"
                onClick={isMobileNavOpen ? closeMobileNav : handleMobileNav}
                className="navigation__menu"
              />
            </div>

            <div className={isMobileNavOpen ? "navigation__list_mobile" : "nav-hidden"}>
              <NavLink exact to='/' style={savedPageColor} className="navigation__link" activeClassName="home">Home</NavLink>
              <NavLink exact to='/saved-news' style={savedPageColor} className="navigation__link" activeClassName="saved">Saved articles</NavLink>

              { currentPath /* to be modified with login status & currentuser check, and link to saved articles*/
                ?
                  <NavLink to='/' style={savedPageColor} className="navigation__signout navigation__button" onClick={props.handleSignoutClick}>
                    <span className="navigation__user">Abravi</span>
                    <img src={logout} alt="logout-icon" className="navigation__signout-icon" />
                  </NavLink>
                : <NavLink to='/' style={savedPageColor} className="navigation__signin navigation__button" onClick={props.handleLoginClick}>Sign in</NavLink>
              }
            </div>
          </div>
        :
          <div className="navigation__content">
            <NavLink exact to='/' style={savedPageColor} className="navigation__title">News Explorer</NavLink>

            <div className="navigation__list">
              <NavLink exact to='/' style={savedPageColor} className="navigation__link" activeClassName="home">Home</NavLink>
              <NavLink exact to='/saved-news' style={savedPageColor} className="navigation__link" activeClassName="saved">Saved articles</NavLink>

              { currentPath /* to be modified with login status & currentuser check, and link to saved articles*/
                ?
                  <NavLink to='/' style={savedPageColor} className="navigation__signout navigation__button" onClick={props.handleSignoutClick}>
                    <span className="navigation__user">Abravi</span>
                    <img src={logout} alt="logout-icon" className="navigation__signout-icon" />
                  </NavLink>
                : <NavLink to='/' style={savedPageColor} className="navigation__signin navigation__button" onClick={props.handleLoginClick}>Sign in</NavLink>
              }
            </div>
          </div>
      }
    </nav>
  )
}

export default Navigation;