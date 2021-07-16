// the news card component
import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import './NewsCard.css';

function NewsCard({
  keyword,
  title,
  text,
  date,
  source,
  link,
  image,
  alt,
  handleArticleDelete,
}) {
  // current user context
  // const currentUser = React.useContext(CurrentUserContext);

  const currentPath = useRouteMatch('/saved-news');
  const [ iconHovered, setIconHover ] = React.useState(false);
  const [ iconClicked, setIconClicked ] = React.useState(false);
  const bookmarkText = "Sign in to save articles";
  const deleteText = "Remove from saved";

  function handleClick() {
  }


  return (
    <li className="element">
      <div className="element__buttons">
        <span className={ `${iconHovered ? "element__button-text" : "text_hiden" }`}>
          { currentPath ? deleteText : bookmarkText }
        </span>

        <button
          style={{visibility: currentPath ? 'hidden' : 'visible'}}
          type="button"
          aria-label="bookmark-article"
          className={`element__button ${iconClicked ? "element__bookmark_clicked" : "element__bookmark"}`}
          onClick={() => setIconClicked(true)}
          onMouseOver={() => setIconHover(true)}
          onMouseLeave={() => setIconHover(false)}
        />
      </div>

      <div className="element__buttons" style={{width: '90%'}}>
        <span className={ `${currentPath ? "element__button-text" : "text_hiden" }`}>
          { currentPath ? keyword : '' }
        </span>

        <button
          style={{visibility: currentPath ? 'visible' : 'hidden'}}
          type="button"
          aria-label="delete-article"
          className="element__button element__delete"
          onClick={handleArticleDelete}
          onMouseOver={() => setIconHover(true)}
          onMouseLeave={() => setIconHover(false)}
        />
      </div>


      <img className="element__photo" src={image} alt={alt} onClick={handleClick} />
      <div className="element__details">
        <p className="element__date">{date}</p>
        <h3 className="element__title">{title}</h3>
        <p className="element__paragraph">{text}</p>
        <p className="element__keyword">{source}</p>
      </div>
    </li>
  )
}

export default NewsCard;