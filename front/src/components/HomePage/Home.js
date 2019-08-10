import React, {Component} from 'react';
import { Link, animateScroll as  scroller } from 'react-scroll';
import './Home.scss';
import SlotMachine from '../SlotMachine/SlotMachine';
import SlotTimer from './SlotTimer'
import AllInSection from './BetSection/AllInSection';
import BettingSection from './BetSection/BettingSection';
import axios from 'axios';

class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      isBetPlaced: false,
      filters: [],
      game: undefined,
      rotationsCompleted: false,
      shouldSlotSpin: false,
    }
    this.bet = this.bet.bind(this)
    this.reset = this.reset.bind(this)
    this.setSlotSpin = this.setSlotSpin.bind(this)
  }

  componentWillMount(){

}

  reset(){
    this.bet()
    this.resetTimer()
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
          self.setState({
            game: response.data
          })
      }).catch(error=>{
        console.log(error)
      })
    })

  }

  setSlotSpin(){
    if(this.state.game){
      this.setState({
        shouldSlotSpin: false,
      })
    } else{
      this.setState({
        rotationsCompleted: true
      })
    }
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
          <SlotTimer setRotationsCompleted={this.setSlotSpin} setReset={e => this.resetTimer = e}/>
          <div id="bet-section" className="container">
            <div className="bet-row">
                <div className="col">
                  {this.state.isBetPlaced ?
                    <SlotMachine game={this.state.game} setReset={e => this.resetSlot = e} />
                    : <AllInSection AllIn={this.reset}/>}
                </div>
                <div className="divider"></div>
                <div className="col">
                  {this.state.isBetPlaced ? <><div>?</div></> : <BettingSection AllIn={this.bet}/>}
                </div>
            </div>
            <div  onClick={this.reset}className="btn"></div>
          </div>
        </div>
      </div>
    );
  }

}


export default Home;
