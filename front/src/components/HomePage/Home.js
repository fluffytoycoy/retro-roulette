import React, {Component} from 'react';
import './Home.scss';
import SlotMachine from './SlotMachine/SlotMachine';
import SlotTimer from './SlotTimer'
import Hero from './Hero/Hero';
import AllInSection from './BetSection/AllInSection';
import BettingSection from './BetSection/BettingSection';
import BetBar from './BetSection/BetBar';
import './BetSection/BetModal.scss';
import BetModal from './BetSection/BetModal';
import GameSection from './GameRoulette/GameSection'
import GameInfo from './GameRoulette/GameInfo'
import axios from 'axios';

class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      isBetPlaced: false,
      game: undefined,
      rotationsCompleted: false,
      slotFinished: false,
      betModalOpen: false,
      validReturn: true
    }
    this.reset = this.reset.bind(this)
    this.setSlotSpin = this.setSlotSpin.bind(this)
    this.setSlotFinished = this.setSlotFinished.bind(this)
    this.toggleBetModal = this.toggleBetModal.bind(this)
    this.updateFilters = this.updateFilters.bind(this)
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
        slotFinished: false,
        validReturn: true,
      }, () => {
        self.resetSlot()
        console.log(self.props.filtersSelected)
        axios.get('api/test', {
          params:{
            filters: self.props.filtersSelected
          }
        })
          .then(response => {
            if(response.data){
              self.setState({
                game: response.data,
              })
            }else{
              self.setState({
                validReturn: !!response.data,
              })
            }

          }).catch(error => {
            console.log(error)
          })
      })
    }
  }

  setSlotSpin(){
    console.log('slot timer finished')
    if(this.state.game){
      this.setState({
        rotationsCompleted: true
      })
    } else{
      this.setState({
        rotationsCompleted: true
      })
    }
  }

  setSlotFinished(){
    this.setState({
      slotFinished: true,
    })
  }

  toggleBetModal(){
    document.body.classList.toggle('modal')
    this.setState({
      betModalOpen: !this.state.betModalOpen
    })
  }

  updateFilters(consoles, genres){
    this.props.updateFilters(consoles, genres)
    this.reset();
  }

  render(){
    return (
      <>
      <div id="home" className={`${this.state.betModalOpen ? 'blur' : ''}`}>
        <Hero/>
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
                    <SlotMachine open={this.state.betModalOpen}
                      slotFinished={this.state.slotFinished}
                      setSlotFinished={this.setSlotFinished}
                      game={this.state.game}
                      rotationsCompleted={this.state.rotationsCompleted}
                      setReset={e => this.resetSlot = e}
                      validReturn={this.state.validReturn}/>
                    : <AllInSection AllIn={this.reset}/>}
                </div>
                <div className="divider"></div>
                <div className={`col ${this.state.isBetPlaced ? 'game' : ''}`}>
                  <GameColoumn {...this.state} toggleBetModal={this.toggleBetModal}/>
                </div>
                <GameInfoBar {...this.state} />
            </div>
            <BetBar slotFinished={this.state.slotFinished} toggleBetModal={this.toggleBetModal} spinAgain={this.reset}/>
          </div>
        </div>
      </div>
      <BetModal filterOptions={this.props.filterOptions}
                filtersSelected={this.props.filtersSelected}
                toggleBetModal={this.toggleBetModal}
                open={this.state.betModalOpen}
                updateFilters={this.updateFilters}/>
      </>
    );
  }

}

function GameInfoBar(props){
  return props.slotFinished ? <GameInfo game={props.game} mounted={props.slotFinished}/> : <></>
}

function GameColoumn(props){
  return props.isBetPlaced ?
      <GameSection game={props.game}
        slotFinished={props.slotFinished}
        validReturn={props.validReturn}/>
    : <BettingSection
        toggleBetModal={props.toggleBetModal}/>
}


export default Home;
