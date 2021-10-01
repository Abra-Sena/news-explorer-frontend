// the news card component
import React from 'react';
import imageNotFound from '../../images/no-image-available.png';
import './NewsCard.css';

function NewsCard(props) {
  const [ iconHovered, setIconHover ] = React.useState(false);
  const [ iconClicked, setIconClicked ] = React.useState(false);
  const bookmarkText = "Sign in to save articles";
  const deleteText = "Remove from saved";
  const noImage = props.article.urlToImage === null;

  function convertDate(date) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return (new Date(date)).toLocaleDateString("en-US", options);
  }

  function handleClick() {
    setIconClicked(true);
    props.bookMarkClick(props.article);
  }

  return (
    <li className="element">
      <div className="element__buttons">
        { !props.isLoggedIn &&
          <span className={ `${iconHovered ? "element__button-text" : "element__button-text_hidden" }`}>
            { props.savedNews ? deleteText : bookmarkText }
          </span>
        }

        <button
          style={{visibility: props.savedNews ? 'hidden' : 'visible'}}
          type="button"
          aria-label="bookmark-article"
          className={`element__button ${(iconClicked && props.isLoggedIn) ? "element__bookmark_clicked" : "element__bookmark"}`}
          onClick={handleClick}
          onMouseOver={() => setIconHover(true)}
          onMouseLeave={() => setIconHover(false)}
        />
      </div>

      <div className="element__buttons" style={{width: '90%'}}>
        <span className={ `${props.savedNews ? "element__button-text" : "element__button-text_hidden" }`}>
          { props.savedNews ? props.article.keyword :
            (!props.savedNews && props.isLoggedIn) ? props.searchRequest : ''
          }
        </span>

        <button
          style={{visibility: props.savedNews ? 'visible' : 'hidden'}}
          type="button"
          aria-label="delete-article"
          className="element__button element__delete"
          onClick={handleClick}
          onMouseOver={() => setIconHover(true)}
          onMouseLeave={() => setIconHover(false)}
        />
      </div>


      <img
        // className="element__photo"
        className={noImage ? "element__photo element__photo_notfound" : "element__photo"}
        src={noImage ? imageNotFound : props.article.urlToImage}
        alt={props.article.title}
        onClick={handleClick}
      />
      <div className="element__details">
        <p className="element__date">{convertDate(props.article.publishedAt)}</p>
        <a className="element__title" href={props.article.url} target="blank">{props.article.title}</a>
        <p className="element__paragraph">{props.article.description}</p>
        <p className="element__keyword">{props.article.source.name}</p>
      </div>
    </li>
  )
}

export default NewsCard;