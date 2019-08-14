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
      betModalOpen: false,
      validReturn: true
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
          consoles: response.data.consoles.map(console=>(console.value)),
          genres: response.data.genres.map(genre=>(genre.value)),
        }
      })
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
        slotFinished: false,
        validReturn: true,
      }, () => {
        self.resetSlot()
        console.log(self.state.filtersSelected)
        axios.get('api/test', {
          params:{
            filters: self.state.filtersSelected
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
    let self = this;
    this.setState({
      filtersSelected:{
        consoles: consoles,
        genres: genres
      }
    }, ()=>{
      self.reset()
    })
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
                  <GameColoumn {...this.state} />
                </div>
                <GameInfoBar {...this.state} {...this.toggleBetModal}/>
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
