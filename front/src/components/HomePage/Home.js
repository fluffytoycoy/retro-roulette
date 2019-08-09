import React, {Component} from 'react';
import { Link, animateScroll as  scroller } from 'react-scroll';
import './Home.scss';
import SlotMachine from '../SlotMachine/SlotMachine';
import BetSection from './BetSection/BetSection';
import axios from 'axios';

class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      isBetPlaced: false
    }
    this.bet = this.bet.bind(this)
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

  bet(){
    this.setState({
      isBetPlaced: true
    })
  }

  render(){
    return (
      <div id="home">
        <div id="hero">
          <div className="sign-wrapper">
            <img alt="retro vegas sign with lights on" className="lights-on" src="/img/retro_sign.png"/>
            <img alt="retro vegas sign with lights off" className="lights-off" src="/img/retro_sign_off.png"/>
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
                  {this.state.isBetPlaced ? <SlotMachine/> : <BetSection AllIn={this.bet}/>}
                </div>
              <div className="divider">
              </div>
              <div className="col">
                <div>
                  <h1>Place your bets</h1>
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
