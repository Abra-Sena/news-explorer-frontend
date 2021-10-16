// the page with saved cards
import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNews.css';

function SavedNews(props) {
  function articlesKeywords() {
    const savedKeywords = [...new Set(props.cards.map(({keyword}) => keyword))];
    const [first, second] = savedKeywords;
    const { length } = savedKeywords;

    return length > 3 ? `${first}, ${second}, and ${length - 2} others` : savedKeywords.join(', ');
  }


  return(
    <main className="content">
      <section className="savednews">
        <div className="savednews__content">
          <span className="savednews__highlight">Saved articles</span>
          <h2 className="savednews__title">
            {props.currentUser.name}, you have {props.cards.length} saved articles.
          </h2>
          { props.cards.length > 0 && <span className="savednews__keywords">
              By keywords: <b>{articlesKeywords()}</b>
            </span>
          }
        </div>

        {
          props.cards.length > 0
          ? <div className="elements saved__articles">
              <NewsCardList
                articles={props.cards}
                searchRequest={props.searchRequest}
                isLoggedIn={props.isLoggedIn}
                savedNews={props.savedNews}
                // bookMarkClick={props.bookMarkClick}
              />
            </div>
          : null
        }

      </section>
    </main>
  )
}

export default SavedNews;