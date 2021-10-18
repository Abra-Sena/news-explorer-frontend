/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';

import ProtectedRoute from '../ProtectedRoute';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import InfoPopup from '../InfoPopup/InfoPopup';
import Main from '../Main/Main';
import SavedNews from "../SavedNews/SavedNews";
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NewsApi from '../../utils/NewApi';
import MainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import { BASE_URL, BASE_NEWS_URL } from '../../utils/Constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './App.css';

function App() {
  const location = useLocation();
  const savedNews = location.pathname === '/saved-news';
  const history = useHistory();
  const [token, setToken] = React.useState(() => localStorage.getItem("jwt"));
  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);
  const [savedArticles, setSavedArticles] = React.useState([]);
  const [duplicateUser, setDuplicateUser] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const [searchRequest, setSearchRequest] = React.useState(false);
  const [wrongInputs, setWrongInputs] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isServerError, setServerError] = React.useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [isSuccessPopup, setSuccessPopup] = React.useState(false);
  // const [success, setSuccess] = React.useState(false);
  const [articlesCount, setArticlesCount] = React.useState(3);
  const [values, setValues] = React.useState({email: '', password: '', username: ''});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const mainApi = new MainApi({
    baseUrl: BASE_URL,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  });
  const newsApi = new NewsApi({
    baseUrl: BASE_NEWS_URL,
    headers: {
      "Content-Type": "application/json",
    }
  });
  const handleFormReset = React.useCallback(
    (
      newValues = {email: '', password: '', username: ''},
      newErrors = {email: '', password: '', username: ''},
      newIsValid = false
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  function inputsValidation() {
    const formText = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    setErrors((state) => ({
      ...state,
      email: formText.test(values.email) ? "" : "Please enter a valid email!"
    }));
  }

 function handleFormChange(evt) {
   const {name, value} = evt.target
   const newValues = { ...values, [name]: value }

    setValues(newValues);
    inputsValidation(newValues);
    setErrors({...errors, [name]: errors[name] });
    setIsValid(evt.target.closest('form').checkValidity());
  }

  function formSwitch(e) {
    e.preventDefault();
    handleFormReset()

    if(isRegisterPopupOpen) {
      handleLoginClick()
      setRegisterPopupOpen(false)
    } else if(isLoginPopupOpen) {
      handleRegisterClick()
      setLoginPopupOpen(false)
    } else {
      handleLoginClick()
      setSuccessPopup(false)
    }
  }

  // Register
  function handleRegisterClick() {
    setRegisterPopupOpen(true);
    setLoginPopupOpen(false);
    setWrongInputs(false);
  }
  function handleRegister(e) {
    e.preventDefault();

    auth.register(values.email, values.password, values.username)
      .then((res) => {
        if(res.status === 409) {
          setDuplicateUser(true);
          return Promise.reject(`Error! ${res.statusText}`);
        }

        if(res.ok) return res.json();
      })
      .then(() => {
        setIsValid(true);
        setSuccessPopup(true);
        setRegisterPopupOpen(false);
        setLoginPopupOpen(false);
        setDuplicateUser(false);
        handleFormReset();
      })
      .catch((err) => {
        console.log(err);
        setServerError(err.validation ? err.validation.body.message : 'Email is already taken') // needed ?
      });
  }

  // Login
  function handleLoginClick() {
    setLoginPopupOpen(true);
    setRegisterPopupOpen(false);
    setSuccessPopup(false);
  }
  function handleLogin(e) {
    e.preventDefault();

    auth.authorize(values.email, values.password)
      .then((res) => {
        if(res.status === 401) {
          setWrongInputs(true);
          return Promise.reject(`Error! ${res.statusText}`);
        }

        if(res.ok) return res.json();

        return Promise.reject(`Error! ${res.statusText}`);
      })
      .then((data) => {
        setWrongInputs(false);
        if(data.token) return data;
        return;
      })
      .then((data) => {
        if(data && data.token) {
          setToken(data.token)
          localStorage.setItem('jwt', data.token);
          setCurrentUser({ email: data.email, name: data.username });
          setIsLoggedIn(true);
        }
      })
      .then(() => {
        handleFormReset();
        closeAllPopups();
      })
      .catch(err => err.status === 400 ? 'One of the fields is incorrect!' : console.log(err));
  }

  // Signout
  function handleSignoutClick() {
    unSavedArticles();
    handleSignOut();
  }
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser({});
    setCards([]);
    closeAllPopups();
    history.push('/');
  }

  // Search requests
  function unSavedArticles() {
    const newCards = cards;

    setCards(newCards.forEach((c) => { c.isSaved = false }));
  }
  function handleSearchSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    if(searchRequest.length === 0) {
      setIsLoading(false);
      setServerError('Please enter a word to search');
      return;
    }
    console.log('topic/keyword: ', searchRequest)

    newsApi.searchArticles(searchRequest)
      .then((res) => {
        if(res.length === 0) {
          setNotFound(true);
          setIsLoading(false);
        }

        res.forEach((article) => {
          article.keyword = searchRequest[0].toUpperCase() + searchRequest.slice(1).toLowerCase();
          articleStatus();
        });

        return res;
      })
      .then((data) => {
        setArticlesCount(3);
        setCards(data);
      })
      .catch((err) => {
        setServerError('Sorry, something went wrong. There may be a connection issue or the server may be down. Please try again later.');
        console.log('Error message:', err, err.message);
      })
      .finally(() => setIsLoading(false))
  }

  function handleSearchChange(evt) {
    setSearchRequest(evt.target.value);
  }

  // Popups
  function closeAllPopups() {
    setRegisterPopupOpen(false)
    setLoginPopupOpen(false);
    setDuplicateUser(false);
    setWrongInputs(false);
    setSuccessPopup(false);
    handleFormReset();
  }
  function handlePopupClose(evt) {
    if(evt.target !== evt.currentTarget) return;

    closeAllPopups();
  }

  // Others
  function bookMarkClick(card) {
    if(!isLoggedIn) return handleLoginClick();

    if(card.isSaved === true) {
      return handleDeleteClick(card);
    }

    if(isLoggedIn && !savedNews) {
      mainApi.saveArticle({
        keyword: card.keyword,
        title: card.title,
        description: card.description,
        publishedAt: card.publishedAt,
        source: card.source.name,
        url: card.url,
        urlToImage: card.urlToImage
      })
      .then((res) => {
        res.isSaved = true;
        setSavedArticles([...savedArticles, res])
      })
      .catch((err) => console.log(err));
    } else handleDeleteClick(card);
  }

  function handleDeleteClick(card) {
    card.isSaved = false;
    mainApi.deleteArticle(card._id)
    .then(() => {
      const newSavedArticles = savedArticles.filter((a) => a._id !== card._id);

      setSavedArticles(newSavedArticles);
    })
    .catch(err => console.log(err));
  }

  function articleStatus() {
    const newSearch = [...cards];
    newSearch.forEach((item) => item.isSaved = false);

    if(savedArticles.length > 0) {
      newSearch.forEach((item) => {
        savedArticles.forEach((saved) => {
          if(saved.url === item.url) {
            item._id = saved._id;
            item.isSaved = true;
          }
        });
      });
      setCards(newSearch);
    } else {
      newSearch.forEach((item) => {
        item.isSaved = false;
        item._id = null;
      })
    }
  }

  function showMoreCards() {
    setArticlesCount(articlesCount + 3);
  }

  function getSavedArticles() {
    mainApi.getArticles(token)
      .then((res) => {
        setSavedArticles(res);
      })
      .catch((err) => console.log(err));
  }


  React.useEffect(() => { // collect user's informations
    if(token) {
      mainApi.getUserInfo(token)
        .then((res) => {
          if(res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
            getSavedArticles();
          }
          else setIsLoggedIn(false);
        })
        .catch((err) => console.log(err))
    }
  }, [token]);
  React.useEffect(() => {
    articleStatus();
  }, [location, savedArticles, isLoggedIn]);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Navigation
        isLoggedIn={isLoggedIn}
        handleLoginClick={handleLoginClick}
        handleRegisterClick={handleRegisterClick}
        handleSignoutClick={handleSignoutClick}
        savedNews={savedNews}
      />

      <Switch>
        <Route exact path='/'>
          <Header
            isServerError={isServerError}
            searchRequest={searchRequest}
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
          />
          <Main
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            isServerError={isServerError}
            isSuccessPopup={isSuccessPopup}
            articlesCount={articlesCount}
            cards={cards}
            notFound={notFound}
            savedNews={savedNews}
            searchRequest={searchRequest}
            bookMarkClick={bookMarkClick}
            showMoreCards={showMoreCards}
            handleLoginClick={handleLoginClick}
            handlePopupClose={handlePopupClose}
            handleRegisterClick={handleRegisterClick}
            handleSignoutClick={handleSignoutClick}
          />
        </Route>

        <ProtectedRoute exact path='/saved-news'
          component={SavedNews}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
          cards={savedArticles}
          savedNews={savedNews}
          searchRequest={searchRequest}
          bookMarkClick={bookMarkClick}
        />
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>

      <Footer />

      <RegisterForm
        duplicateUser={duplicateUser}
        values={values}
        errors={errors}
        isValid={isValid}
        wrongInputs={wrongInputs}
        isOpen={isRegisterPopupOpen}
        onClose={handlePopupClose}
        handleRegister={handleRegister}
        onSwitch={formSwitch}
        handleFormChange={handleFormChange}
      />
      <LoginForm
        values={values}
        errors={errors}
        isValid={isValid}
        wrongInputs={wrongInputs}
        isOpen={isLoginPopupOpen}
        onClose={handlePopupClose}
        handleLogin={handleLogin}
        onSwitch={formSwitch}
        handleFormChange={handleFormChange}
      />
      <InfoPopup
        isOpen={isSuccessPopup}
        onClose={handlePopupClose}
        onSwitch={formSwitch}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
