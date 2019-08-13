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
      filterOptions: {
        consoles: [],
        genres: [],
      },
      filtersSelected: {
        consoles: [],
        genres: [],
      },
      game: undefined,
      rotationsCompleted: false,
      slotFinished: false,
      betModalOpen: false
    }
    this.reset = this.reset.bind(this)
    this.setSlotSpin = this.setSlotSpin.bind(this)
    this.setSlotFinished = this.setSlotFinished.bind(this)
    this.toggleBetModal = this.toggleBetModal.bind(this)
    this.updateFilters = this.updateFilters.bind(this)
  }

  componentWillMount(){
    let self = this;
    axios.get('/api/filterInfo')
    .then(response=>{
      self.setState({
        filterOptions:{
          consoles: response.data.consoles,
          genres: response.data.genres
        },
        filtersSelected:{
          consoles: response.data.consoles,
          genres: response.data.genres
        }
      }, ()=>{console.log(this.state)})
    })
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
            setTimeout(() => {
              self.setState({
                game: Object.assign(response.data, {
                  console: 2
                })
              })
            }, 6000)

          }).catch(error => {
            console.log(error)
          })
      })
    }
  }

  setFilters(){

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

  toggleBetModal(){
    this.setState({
      betModalOpen: !this.state.betModalOpen
    })
  }

  updateFilters(){

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
                    <SlotMachine slotFinished={this.state.slotFinished} setSlotFinished={this.setSlotFinished} game={this.state.game} rotationsCompleted={this.state.rotationsCompleted} setReset={e => this.resetSlot = e} />
                    : <AllInSection AllIn={this.reset}/>}
                </div>
                <div className="divider"></div>
                <div className={`col ${this.state.isBetPlaced ? 'game' : ''}`}>
                  {this.state.isBetPlaced ? <GameSection game={this.state.game} slotFinished={this.state.slotFinished}/> : <BettingSection toggleBetModal={this.toggleBetModal}/>}
                </div>
                {this.state.slotFinished ? <GameInfo mounted={this.state.slotFinished}/> : <></>}
            </div>
            <BetBar slotFinished={this.state.slotFinished} toggleBetModal={this.toggleBetModal} spinAgain={this.reset}/>
          </div>
        </div>
      </div>
      <BetModal filterOptions={this.state.filterOptions}
                filtersSelected={this.state.filtersSelected}
                toggleBetModal={this.toggleBetModal}
                open={this.state.betModalOpen}
                updateFilters={this.updateFilters}/>
      </>
    );
  }

}


export default Home;
