// the news card component
import React from 'react';
import imageNotFound from '../../images/no-image-available.png';

import './NewsCard.css';

function NewsCard(props) {
  const [ iconHovered, setIconHover ] = React.useState(false);
  const [ iconClicked, setIconClicked ] = React.useState(false);
  const bookmarkText = "Sign in to save articles";
  const deleteText = "Remove from saved";
  const buttonWidth = props.savedNews ? '90%' : null

  function convertDate(date) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return (new Date(date)).toLocaleDateString("en-US", options);
  }

  function handleClick() {
    if(props.isLoggedIn) setIconClicked(true);

    props.bookMarkClick(props.article);
  }


  return (
    <li className="element">
      <div className="element__buttons" style={{width: buttonWidth}}>
        <span className={ `${props.savedNews ? "element__button-text" : "element__button-text_hidden" }`}>
          { props.savedNews ? props.article.keyword :
            (!props.savedNews && props.isLoggedIn) ? props.searchRequest : ''
          }
        </span>

        { !props.isLoggedIn &&
          <span className={ `${iconHovered ? "element__button-text" : "element__button-text_hidden" }`}>
            { props.savedNews && props.article.isSaved ? deleteText : bookmarkText }
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
        className="element__photo"
        src={props.article.urlToImage === null ? imageNotFound : props.article.urlToImage}
        alt={props.article.title}
      />
      <div className="element__details">
        <p className="element__date">{convertDate(props.article.publishedAt)}</p>
        <a className="element__title" href={props.article.url} target="blank">{props.article.title}</a>
        <p className="element__paragraph">{props.article.description}</p>
        <p className="element__keyword">
          { props.savedNews ? props.article.source : props.article.source.name }
        </p>
      </div>
    </li>
  )
}

export default NewsCard;