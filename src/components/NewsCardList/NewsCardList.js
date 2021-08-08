// the component that controls the rendering of cards on pages and their amount
import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import NotFounded from '../NotFounded/NotFounded';
import Preloader from '../Preloader/Preloader';
// mock data images
import image1 from '../../images/image1.png';
import image2 from '../../images/image2.png';
import image3 from '../../images/image3.png';
import image4 from '../../images/image4.png';
import image5 from '../../images/image5.png';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './NewsCardList.css';

function NewsCardList({ isLoading, notFound, isServerError }) {
  // current user context
  // const currentUser = React.useContext(CurrentUserContext);


  if(isLoading) return <Preloader />

  if(notFound || isServerError) return <NotFounded />

  // mock data text
  const text1="Ever since I read Richard Louv's influential book, \"Last Child in the Woods,\" the idea of having a special \"sit spot\" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find"
  const text2="We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves."
  const text3="“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be"
  const text4="Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to"
  const text5="Humans have long relied on the starry sky to push into new frontiers, sail to the very edge of the world and find their way back home again. Even animals look to the stars to guide them."

  return (
    <ul className="elements__list">
      <NewsCard
        image={image1}
        date='November 4, 2020'
        title='Everyone Needs a Special "Sit Spot" in Nature'
        text={text1}
        keyword="Nature"
        source="treehugger"
      />
      <NewsCard
        image={image2}
        date="February 19, 2019"
        title="Nature makes you better"
        text={text2}
        keyword="Nature"
        source="national geographic"
      />
      <NewsCard
        image={image3}
        date="November 4, 2020"
        title="Grand Teton Renews Historic Crest Trail"
        text={text3}
        keyword="Parks"
        source="National parks traveler"
      />
      <NewsCard
        image={image4}
        date="October 19, 2020"
        title="Nostalgic Photos of Tourists in U.S. National Parks"
        text={text4}
        keyword="Yellowstone"
        source="national geographic"
      />
      <NewsCard
        image={image5}
        date="March 16, 2020"
        title="Scientists Don't Know Why Polaris Is So Weird "
        text={text5}
        keyword="Photography"
        source="treehugger"
      />
    {/* {
      props.cards.map((card, id) =>
        <NewsCard
          key={id}
          card={card}
          alt={card.alt}
          src={card.src}
          title={card.title}
        />
      )
    } */}
  </ul>
  )
}

export default NewsCardList;