import React from 'react';
import sadFace from "../../images/not-found.svg";

import './NotFounded.css';

function NotFounded() {
  return (
    <>
      <img src={sadFace} alt='sad-face' />
      <h3 className="notfound__title">Nothing found</h3>
    </>
  )
}

export default NotFounded;