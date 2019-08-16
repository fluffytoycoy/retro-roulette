import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './Dashboard.scss';
import GamesDash from './GamesDash/GamesDash'
import BetModal from '../HomePage/BetSection/BetModal'
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state={
      menuOpen: false,
      gameList: this.props.gameList,
      betModalOpen: false
    }
    this.filterList = this.filterList.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.toggleBetModal = this.toggleBetModal.bind(this)
  }

  componentWillMount(){
    console.log(this.props.history)
    if(!this.props.gameList){
      var self = this
      axios.get('/api/testAuth',{
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`
        }
      })
      .then(response=>{
        this.setState({
          gameList: response.data
        })
        self.props.setGameList(response.data)
      })
      axios.get('/api/filterInfo')
      .then(response=>{
        self.setState({
          filterOptions:{
            consoles: response.data.consoles,
            genres: response.data.genres
          },
          filtersSelected:{
            consoles: [],
            genres: [],
          }
        })
      })
    }
  }

  toggleMenu(){
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  filterList(consoles, genres){
    console.log(consoles)
    // console.log(genres.length)
    let filteredList = this.props.gameList;
    if(consoles.length){
      filteredList = filteredList.filter(game=>{
          return consoles.filter(consoleId=>{
            return consoleId === game.console_id;
          })[0]
        });
        console.log(filteredList)
    }
    if(genres.length){
      filteredList = filteredList.filter(game=>{
          return genres.filter(genreId=>{
            return genreId === game.genre_id;
          })[0]
        });
    }
    this.props.history.push(`/Dashboard/Page/1`)
    this.setState({
      gameList: filteredList
    })
  }
  toggleBetModal(){
    document.body.classList.toggle('modal')
    this.setState({
      betModalOpen: !this.state.betModalOpen
    })
  }

  render(){
    const gameList = this.state.gameList;
    console.log(this.state)
    return (
      <Tabs id="dashboard">
      <BetModal filterOptions={this.state.filterOptions}
                filtersSelected={this.state.filtersSelected}
                toggleBetModal={this.toggleBetModal}
                open={this.state.betModalOpen}
                updateFilters={this.filterList}
                noErrors/>
        <i onClick={this.toggleMenu}className="fas fa-bars menu-btn"></i>
        <div className={`sideboard ${this.state.menuOpen ? 'show' : ''}`}>
          <h2>Retro Roulette</h2>
          <TabList>
            <Tab><p>Games</p></Tab>
            <Tab><p>Genres</p></Tab>
            <Tab><p>Consoles</p></Tab>
            <a alt="logout" href="/logout"><li><i className="fas fa-sign-out-alt logout"></i>Logout</li></a>
          </TabList>
        </div>
        <div className="dash-body">
            <h2>Dashboard</h2>
            <TabPanel>
                <div className="grid-wrapper">
                  {gameList ?  <GamesDash toggleMenu={this.toggleBetModal}{...this.props} filter={this.filterList} page={this.props.match.params.number} gameList={this.state.gameList}/> : <>loading</>}
                </div>
            </TabPanel>
            <TabPanel>
              <div className="grid-wrapper">
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid-wrapper">
              </div>
            </TabPanel>

        </div>
      </Tabs>
    );
  }

}


export default withRouter(Dashboard);
