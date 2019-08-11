import React, {Component} from 'react';
import { Link, animateScroll as  scroller } from 'react-scroll';
import './Home.scss';
import SlotMachine from '../SlotMachine/SlotMachine';
import SlotTimer from './SlotTimer'
import AllInSection from './BetSection/AllInSection';
import BettingSection from './BetSection/BettingSection';

import GameSection from './GameRoulette/GameSection'
import GameInfo from './GameRoulette/GameInfo'
import axios from 'axios';

class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      isBetPlaced: false,
      filters: [],
      game: undefined,
      rotationsCompleted: false,
      slotFinished: false,
    }
    this.reset = this.reset.bind(this)
    this.setSlotSpin = this.setSlotSpin.bind(this)
    this.setSlotFinished = this.setSlotFinished.bind(this)
  }

  componentWillMount(){

  }

  reset(){
    let self = this;
    //axios call for new game
    //reset and start Timer
    getGame()
    this.resetTimer()

    function getGame() {
      self.setState({
        isBetPlaced: true,
        game: undefined,
        rotationsCompleted: false,
        slotFinished: false
      }, () => {
        self.resetSlot()
        axios.get('api/test')
          .then(response => {
            setTimeout(()=>{
              self.setState({
                game: Object.assign(response.data, {console: 2})
              })
            }, 6000)

          }).catch(error => {
            console.log(error)
          })
      })
    }
  }

  scrollTo() {
    //scroll to for hero button
  scroller.scrollTo('scroll-to-element', {
    duration: 800,
    delay: 0,
    smooth: 'easeInOutQuart'
  })
}

  setSlotSpin(){
    console.log('slot timer finished')
    if(this.state.game){
      this.setState({
        rotationsCompleted: true
      })
    } else{
      this.state.rotationsCompleted = true
    }
  }

  setSlotFinished(){
    console.log('slot finished')
    this.setState({
      slotFinished: true,
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
          <SlotTimer setRotationsCompleted={this.setSlotSpin} setReset={e => this.resetTimer = e}/>
          <div id="bet-section" className="container">
            <div className="bet-row">
                <div className="col">
                  {this.state.isBetPlaced ?
                    <SlotMachine slotFinished={this.state.slotFinished} setSlotFinished={this.setSlotFinished} game={this.state.game} rotationsCompleted={this.state.rotationsCompleted} setReset={e => this.resetSlot = e} />
                    : <AllInSection AllIn={this.reset}/>}
                </div>
                <div className="divider"></div>
                <div className={`col ${this.state.isBetPlaced ? 'game' : ''}`}>
                  {this.state.isBetPlaced ? <GameSection game={this.state.game} slotFinished={this.state.slotFinished}/> : <BettingSection AllIn={this.bet}/>}
                </div>
                {this.state.slotFinished ? <GameInfo mounted={this.state.slotFinished}/> : <></>}
            </div>
            <div  onClick={this.reset}className="btn"></div>
          </div>
        </div>
      </div>
    );
  }

}


export default Home;
