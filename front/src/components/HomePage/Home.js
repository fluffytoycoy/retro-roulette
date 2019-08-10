import React, {Component} from 'react';
import { Link, animateScroll as  scroller } from 'react-scroll';
import './Home.scss';
import SlotMachine from '../SlotMachine/SlotMachine';
import AllInSection from './BetSection/AllInSection';
import BettingSection from './BetSection/BettingSection';
import axios from 'axios';

class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      isBetPlaced: false,
      filters: [],
      game: undefined
    }
    this.bet = this.bet.bind(this)
  }

componentWillMount(){

}

scrollTo() {
  scroller.scrollTo('scroll-to-element', {
    duration: 800,
    delay: 0,
    smooth: 'easeInOutQuart'
  })
}

  bet(){
    let self = this;
    this.setState({
      isBetPlaced: true
    },()=>{
      axios.get('api/test')
      .then(response=>{
        setTimeout(()=>{
          self.setState({
            game: response.data
          })
        }, 7000)
      }).catch(error=>{
        console.log(error)
      })
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
                  {this.state.isBetPlaced ? <SlotMachine game={this.state.game}/> : <AllInSection AllIn={this.bet}/>}
                </div>
              <div className="divider">
              </div>
              <div className="col">
                {this.state.isBetPlaced ? <><div>?</div></> : <BettingSection AllIn={this.bet}/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Home;
