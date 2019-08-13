import React from 'react';
import './Hero.scss';
import RouletteSVG from './Roulette';
import { Link, animateScroll as  scroller } from 'react-scroll';

function Hero(){
  function scrollTo() {
    //scroll to for hero button
  scroller.scrollTo('scroll-to-element', {
    duration: 800,
    delay: 0,
    smooth: 'easeInOutQuart'
  })
}

  return(
    <div id="hero">
      <div className="sign-wrapper">
        <img alt="retro vegas sign with lights on" className="lights-on" src="/img/retro_sign.png"/>
        <img alt="retro vegas sign with lights off" className="lights-off" src="/img/retro_sign_off.png"/>
        <RouletteSVG/>
      </div>
      <div className="btn-wrapper">
        <Link to="bet-section" smooth={true} duration={500}>
          <div className="hero-btn">
            Place your bets
          </div>
        </Link >
      </div>
    </div>
  )
}

export default Hero;