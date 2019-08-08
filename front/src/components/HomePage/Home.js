import React, {Component} from 'react';
import { render } from 'react-dom';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import './Home.scss';
import axios from 'axios';

class Home extends Component{
  constructor(){
    super();
  }

componentWillMount(){
  axios.get('api/test')
  .then(response=>{
    console.log(response)
  }).catch(error=>{
    console.log(error)
  })
}

scrollTo() {
  scroller.scrollTo('scroll-to-element', {
    duration: 800,
    delay: 0,
    smooth: 'easeInOutQuart'
  })
}


  render(){
    return (
      <div id="home">
        <div id="hero">
          <div className="sign-wrapper">
            <img className="lights-on" src="/img/retro_sign.png"/>
            <img className="lights-off" src="/img/retro_sign_off.png"/>
          </div>
          <div className="btn-wrapper">
            <Link to="bet-section" smooth={true} duration={500}>
              <div className="hero-btn">
                Place your bets
              </div>
            </Link >
          </div>
        </div>
        <div id="bets">
          <div className="container">
            <div>
              <div className="ad">
                <p>temp ad</p>
              </div>
            </div>
          </div>
          <div id="bet-section" className="container">
            <div className="bet-row">
                <div className="col">
                <div>
                  <h1>High Roller</h1>
                  <p>Going all in will select a random game from the NES, SNES, Gameboy, Sega Master System or Sega Genesis.</p>
                  <p>All genres are included in the pool.</p>
                  <p>Do you have the courage to go all in?</p>
                </div>
                <div className="hero-btn">
                </div>
              </div>
              <div className="divider">
              </div>
              <div className="col">
                <div>
                  <h1>Place your bet</h1>
                  <p>Placing your bet will let you select which console or consoles will show up in the roulette.</p>
                  <p>In addtion you can cross off genres you don't want such as Sports, RPGs, Racing, ect.</p>
                  <p>The cards are in your hands, Ante up.</p>
                </div>
                <div className="hero-btn">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Home;
