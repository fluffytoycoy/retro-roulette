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
            <Link to="bets" smooth={true} duration={500}>
              <div className="hero-btn">
                Place Your Bets
              </div>
            </Link >
          </div>
        </div>
        <div id="bets">

        </div>
      </div>
    );
  }

}

export default Home;
