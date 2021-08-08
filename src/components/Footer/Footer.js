// a presentational component that renders the footer
import React from 'react';
import { Link } from 'react-router-dom';
import Twitter from '../../images/twitter.svg';
import Git from '../../images/github_logo.svg';
import LinkedIn from '../../images/linkedin_logo.svg';

import './Footer.css';

function Footer() {
  return(
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright">© 2021 Emissa, Powered by News API</p>

        <div className="footer__elements">
          <div className="footer__links-text">
            <Link className="footer__link" to='/'>Home</Link>
            <a
              href="https://practicum.yandex.com/web"
              target="_blank"
              rel="noreferrer"
              className="footer__link">
                Praticum by Yandex
            </a>
          </div>

          <div className="footer__links-image">
            <a
              href="https://www.github.com/Abra-Sena"
              target="_blank"
              rel="noreferrer"
              className="footer__link">
                <img src={Git} alt="github icon" className="footer__social-icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/abravi-emiline-tekpa/"
              target="_blank"
              rel="noreferrer"
              className="footer__link">
                <img src={LinkedIn} alt="linkedin icon" className="footer__social-icon" />
            </a>
            <a
              href="https://twitter.com/Emiline_T"
              target="_blank"
              rel="noreferrer"
              className="footer__link">
                <img src={Twitter} alt="twitter icon" className="footer__social-icon" />
            </a>
          </div>
        </div>
      </div>


    </footer>
  )
}

export default Footer;