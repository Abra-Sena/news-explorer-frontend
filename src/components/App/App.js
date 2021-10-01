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
import * as api from '../../utils/MainApi';
import { BASE_NEWS_URL } from '../../utils/Constants';
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

  const newsApi = new NewsApi({
    baseUrl: BASE_NEWS_URL,
    headers: {
      "Content-Type": "application/json",
      // authorization: `Bearer ${token}`
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
    console.log('form switched!')
  }

  // Register
  function handleRegisterClick() {
    console.log('request to open register popup')
    setRegisterPopupOpen(true);
    setLoginPopupOpen(false);
    setWrongInputs(false);
  }
  function handleRegister(e) {
    e.preventDefault();

    api.register(values.email, values.password, values.username)
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
    console.log('request to open login popup')
    setLoginPopupOpen(true);
    setRegisterPopupOpen(false);
    setSuccessPopup(false);
  }
  function handleLogin(e) {
    e.preventDefault();

    api.authorize(values.email, values.password)
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
    history.push('/');
  }

  // Search requests
  function checkDuplicates(articles, savedArticles) { // if duplicate found then isaved = true
    for(let i = 0; i < articles.length; i++) {
      const result = articles[i];
      const existingArticle = savedArticles.find((card) =>
        card.title ===result.title &&
        card.url === result.url &&
        card.urlToImage === result.urlToImage &&
        card.description === result.description
      );

      if(existingArticle) articles[i].isSaved = true;
    }

    setCards(articles);
  }
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
    console.log('topic: ', searchRequest)

    newsApi.searchArticles(searchRequest)
      .then((res) => {
        if(res.length === 0) setNotFound(true)

        res.forEach((article) => {
          article.keyword = searchRequest[0].toUpperCase() + searchRequest.slice(1).toLowerCase();

          if(isLoggedIn) {
            savedArticles.forEach((savedArticle) => {
              if(checkDuplicates(article, savedArticle)) {
                article.isSaved = true;
                article._id = savedArticle._id;
              }
              return;
            });
          }
        });

        return res;
      })
      .then((data) => {
        setArticlesCount(3);
        setCards(data);
        // setSuccess(true);
        setSearchRequest(searchRequest);
        localStorage.setItem('searchResult', JSON.stringify(data));
        // checkDuplicates(data, savedArticles);
        setIsLoading(false);
        setServerError('');
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
  function bookMarkClick(article) {
    if(!isLoggedIn) return handleLoginClick();

    // if(article.isSaved === true) return handleDeleteClick(article);

    if(!savedNews && isLoggedIn) {
      console.log(article);

      if(!article.isSaved) {
        api.saveArticle(article)
        .then((data) => {
          data.isSaved = true;
          const newArticles = cards.map(a => a === article ? data : a)
          const newSavedArticles = [...savedArticles, data];

          setSavedArticles(newSavedArticles);
          setCards(newArticles);
          localStorage.setItem('searchResult', JSON.stringify(newArticles));
          localStorage.setItem('savedArticles', JSON.stringify(newSavedArticles));
        })
        .catch(err => console.log(err));
      }
      else handleDeleteClick(article);
      return;
    }

    if(savedNews) handleDeleteClick(article);
  }

  function handleDeleteClick(article) {
    api.deleteArticle(article._id, token)
      .then((res) => {
        if(res.ok) {
          article.isSaved = false;
          const newCards = cards.map(a => a._id === article._id ? article : a);
          const newSavedArticles = savedArticles.filter((a) => a._id !== article._id);
          setSavedArticles(newSavedArticles);
          setCards(newCards);
          localStorage.setItem('searchResult', JSON.stringify(newCards));
          localStorage.setItem('savedArticles', JSON.stringify(newSavedArticles));
        }
      })
      .catch(err => console.log(err))
  }
  function showMoreCards() {
    setArticlesCount(articlesCount + 3);
  }



  // collect user's informations
  React.useEffect(() => {
    if(token) {
      api.getUserInfo(token)
        .then((res) => {
          if(res) {
            setIsLoggedIn(true);
            setCurrentUser({ email: res.email, name: res.name });

            // api.getArticles(token)
            //   .then((res) => {
            //     setSavedArticles(res);
            //   })
            //   .catch((err) => console.log(err))
          }
        })
        .catch((err) => console.log(err))
    }
    else setIsLoggedIn(false)
  }, [token]);

  // search requests
  React.useEffect(() => {
    if(localStorage.getItem('searchResult')) {
      setCards(JSON.parse(localStorage.getItem('searchResult')))
    }
    if(localStorage.getItem('savedArticles')) { // && isLoggedIn
      setSavedArticles(JSON.parse(localStorage.getItem('savedArticles')));
    }
  }, []);

  // retrieve user's articles
  React.useEffect(() => {
    if(isLoggedIn) {
      api.getArticles(token)
        .then((res) => {
          setSavedArticles(res);
          localStorage.setItem('savedArticles', JSON.stringify(res));
        })
        .catch((err) => console.log(err))
    }
  }, [isLoggedIn, token]);


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
            // success={success}
            bookMarkClick={(article) => bookMarkClick(article)}
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
          cards={cards}
          savedNews={savedNews}
          searchRequest={searchRequest}
          bookMarkClick={(article) => bookMarkClick(article)}
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
