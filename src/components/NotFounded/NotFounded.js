import React from 'react';
import sadFace from "../../images/not-found.svg";

import './NotFounded.css';

function NotFounded() {
  return (
    <div className="notfound">
      <div className="notfound__container">
        <img src={sadFace} alt='sad-face' className="notfound__image" />
        <h3 className="notfound__title">Nothing found</h3>
        <p className="notfound__paragraph">Sorry, but nothing matched your search terms.</p>
      </div>
    </div>
  )
}

export default NotFounded;