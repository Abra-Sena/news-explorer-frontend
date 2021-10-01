// the component that controls the rendering of cards on pages and their amount
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList(props) {
  return (
    <ul className="elements__list">
      {
        props.articles
          .slice(0, props.savedNews ? props.articles.length : props.articlesCount)
          .map((card, id) =>
            <NewsCard
              // key={card._id ? card._id : props.articles.indexOf(card)}
              key={id}
              article={card}
              isLoggedIn={props.isLoggedIn}
              bookMarkClick={props.bookMarkClick}
              savedNews={props.savedNews}
              searchRequest={props.searchRequest}
            />
          )
      }
    </ul>
  )
}

export default NewsCardList;