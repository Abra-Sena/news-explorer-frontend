/* eslint-disable no-restricted-globals */
// the components of the main page
import React from 'react';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import NotFounded from '../NotFounded/NotFounded';
import Preloader from '../Preloader/Preloader';

import './Main.css';

function Main(props) {
  return (
    <main className="content">
      <section className="search">
        <div className="elements">

          { props.isServerError &&
            <>
              <h2 className="elements__title">Search results</h2>
              <p className="search__error">{props.isServerError}</p>
            </>
          }
          { props.cards?.length > 0
            ?
              <>
                <h2 className="elements__title">Search results</h2>
                <NewsCardList
                  articles={props.cards}
                  articlesCount={props.articlesCount}
                  searchRequest={props.searchRequest}
                  isLoggedIn={props.isLoggedIn}
                  bookMarkClick={props.bookMarkClick}
                  savedNews={props.savedNews}
                />

                { props.articlesCount < props.cards?.length &&
                  (<button className="elements__more" onClick={props.showMoreCards}>Show more</button>)
                }
              </>
            : props.isLoading ? <Preloader />
              : (props.notFound || props.cards?.length < 0) ? <NotFounded /> : null
          }
        </div>
      </section>

      <About />
    </main>
  )
}

export default Main;