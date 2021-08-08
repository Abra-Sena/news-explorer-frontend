import React from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';

// import ProtectedRoute from '../ProtectedRoute';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import InfoPopup from '../InfoPopup/InfoPopup';
import Main from '../Main/Main';
import SavedNews from "../SavedNews/SavedNews";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import Api from '../../utils/api';
// import * as auth from '../../utils/auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './App.css';

function App() {
  const location = useLocation();
  const savedNews = location.pathname === '/saved-news';
  const history = useHistory();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isServerError, setIsServerError] = React.useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [isSuccess, setSucess] = React.useState(false);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // const [token, setToken] = React.useState(localStorage.getItem("jwt"));
  const [currentUser, setCurrentUser] = React.useState({});

  //Signout
  function handleSignOut() {
    localStorage.removeItem('jwt');
    // setToken('');
    setIsLoggedIn(false);
    // setEmail('');
    history.push('/');
  }


  function closeAllPopups() {
    setLoginPopupOpen(false);
    setRegisterPopupOpen(false)
    setSucess(false);
    console.log('popup closed!')
  }
  function handlePopupClose(evt) {
    console.log('popup close request')
    if(evt.target !== evt.currentTarget) return;

    closeAllPopups();
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setIsServerError(false);
  }

  function handleSearchChange(evt) {
    // const { name, value } = evt.target;
    // const newInputs = { ...inputs, [name]: value };

  }


  function bookMarkClick(card) {
    if(!isLoggedIn) return handleLoginClick();

    if(savedNews) return handleDeleteClick();

    if(!savedNews && isLoggedIn) {

    }
  }

  function handleLoginClick() {
    setLoginPopupOpen(true);
  }

  function handleRegisterClick() {
    setRegisterPopupOpen(true);
  }

  function handleRegisterSuccess() {
    setSucess(true);
  }
  // function handleSignoutClick() {

  // }

  function handleFormReset() {

  }

  function showMoreCards() {

  }

  function handleDeleteClick() {

  }

  function handlePopupSwitch() {
    console.log('click should switch forms');

    if(isRegisterPopupOpen) {
      setRegisterPopupOpen(false)
      setLoginPopupOpen(true);
      console.log('form switched from "register" to "login"');
    } else if(isLoginPopupOpen) {
      setLoginPopupOpen(false);
      setRegisterPopupOpen(true);
      console.log('form switched from "login" to "register"');
    } else if(isSuccess) {
      console.log('registration succeed');
      setSucess(false);
      // setRegisterPopupOpen(false)
      setLoginPopupOpen(true);
      console.log('form switched from "register succeed" to "login"');
    }
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path='/'>

          <Header />
          <Main
            isLoggedIn={isLoggedIn}
            email={currentUser.email}
            isLoading={isLoading}
            isServerError={isServerError}
            setIsLoggedIn={isLoggedIn}
            setCurrentUser={setCurrentUser}
            handlePopupSwitch={handlePopupSwitch}
            handleLoginClick={handleLoginClick}
            handleRegisterClick={handleRegisterClick}

            showMoreCards={showMoreCards}
            handleSearchSubmit={handleSearchSubmit}
            handleSearchChange={handleSearchChange}
            handleFormReset={handleFormReset}
            bookMarkClick={bookMarkClick}
            handlePopupClose={handlePopupClose}
          />
        </Route>

        <Route exact path='/saved-news'>
          <SavedNews handleSignOut={handleSignOut} />
        </Route>

        {/* <ProtectedRoute exact path='/saved-news'
          isLoggedIn={isLoggedIn}
          // cards={cards}
          component={SavedNews}
          bookMarkClick={bookMarkClick}
          handleSignOut={handleSignOut}
          // handleCardClick={(card) => handleCardClick(card)}
        /> */}
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>

      <Footer />

      <LoginForm
        closeAllPopups={closeAllPopups}
        isLoginPopupOpen={isLoginPopupOpen}
        handleLoginClick={handleLoginClick}
        switch={handlePopupSwitch}
        onClose={handlePopupClose}
        handleFormReset={handleFormReset}
        handleSearchChange={handleSearchChange}
      />

      <RegisterForm
        closeAllPopups={closeAllPopups}
        isRegisterPopupOpen={isRegisterPopupOpen}
        handleRegisterClick={handleRegisterClick}
        handleRegisterSuccess={handleRegisterSuccess}
        switch={handlePopupSwitch}
        onClose={handlePopupClose}
        handleFormReset={handleFormReset}
        handleSearchChange={handleSearchChange}
      />

      <InfoPopup
        closeAllPopups={closeAllPopups}
        isSuccess={isSuccess}
        handleRegisterSuccess={handleRegisterSuccess}
        onClose={handlePopupClose}
        switch={handlePopupSwitch}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
