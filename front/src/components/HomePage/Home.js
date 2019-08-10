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
      shouldSlotSpin: true,
    }
    this.reset = this.reset.bind(this)
    this.setSlotSpin = this.setSlotSpin.bind(this)
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
        shouldSlotSpin: true,
        rotationsCompleted: false
      }, () => {
        self.resetSlot()
        axios.get('api/test')
          .then(response => {
            setTimeout(()=>{
              self.setState({
                game: response.data
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
        shouldSlotSpin: false,
      })
    } else{
      this.state.rotationsCompleted = true
    }
  }

  shouldComponentUpdate(newProps, nextState){
    // if(nextState.game && this.state.rotationsCompleted){
    //
    // } else if(nextState.game && !this.state.rotationsCompleted){
    //   console.log('game is loaded but rotation NOT COMPLETED')
    // } else if (!nextState.game && !this.state.rotationsCompleted){
    //   console.log('game is NOT LOADED and rotation NOT COMPLETED')
    // }
    if(this.state.rotationsCompleted){
    }
    return true;
  }

  setSlotFinished(){

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
                    <SlotMachine game={this.state.game} rotationsCompleted={this.state.rotationsCompleted} setReset={e => this.resetSlot = e} />
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
