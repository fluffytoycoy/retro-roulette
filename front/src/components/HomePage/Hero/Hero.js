import React from 'react';
import './Hero.scss';
import RouletteSVG from './Roulette';
import { Link } from 'react-scroll';
import axios from 'axios';
function Hero(){


  return(

    <div id="hero">
      <div className="sign-wrapper">
        <img alt="retro vegas sign with lights on" className="lights-on" src="/img/retro_sign.png"/>
        <img alt="retro vegas sign with lights off" className="lights-off" src="/img/retro_sign_off.png"/>
        <RouletteSVG/>
      </div>
      <div className="btn-wrapper">
        <Link to="bets" smooth={true} duration={700}>
          <div className="hero-btn">
            Place your bets
          </div>
        </Link >
      </div>
    </div>
  )
}

export default Hero;