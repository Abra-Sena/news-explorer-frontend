// a presentational component that displays information about the author
import React from 'react';
import Avatar from '../../images/my-avatar.png';
import './About.css';

function About() {
  return(
    <section className="about">
      <div className="about__content">
        <img className="about__image" src={Avatar} alt="author-avatar" />

        <div className="about__elements">
          <h2 className="about__title">About the Author</h2>
          <p className="about__paragraph">
            My name is Abravi Emiline and this is the final project to complete my web development course at Practicum by Yandex.
            My role here is of a senior student who help others who are also taking this bootcamp.
            I started this journey about a year ago with Practicum by Yandex, and I can proudly say now that I am a Web Developer.
            <br />
            I am also a full-time student at Berkeley city College majoring in Computer Programming.
          </p>
          <p className="about__paragraph">
            Through this program, I start learning HTML5 and CSS3 first which helped me create one page websites.
            I've also gain knowledge in adaptive web design and Javascript to produce a well organized code which have clear logical roles.
            And lastly in frontend, I gain knowledge in React and become a native. I use those skills to finish projects from the course.
            I am currentlu loving backend and can build a Rest API. In fact, I have my own API for this project.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About;