import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './Dashboard.scss';
import GamesDashboard from './Tabs/GamesDashboard'
import ConsoleDashboard from './Tabs/ConsoleDashboard'
import GenreDashboard from './Tabs/GenreDashboard'
import Popups from './Popups/Popups'
import BetModal from '../HomePage/BetSection/BetModal'
import findTabIndex from './Tabs/Utils/TabMap';

import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

class Dashboard extends Component{
  constructor(props){
    super(props);

    this.state={
      menuOpen: false,
      gameList: this.props.gameList,
      betModalOpen: false,
      page: 1,
      filters: '',
      databasePopup: false,
      popupStatus: 'success',
      tabIndex: findTabIndex(this.props.match.params.Tab)
    }
    this.filterList = this.filterList.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.toggleBetModal = this.toggleBetModal.bind(this)
    this.setDatabasePopup = this.setDatabasePopup.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  componentWillMount(){
    if(!this.props.gameList){
      var self = this
      const newFilters = self.props.match.params.filter;
      const filters = this.state.filters;
      axios.get('/api/getAllGames',{
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`
        }
      })
      .then(response=>{
        self.props.setGameList(response.data)
        self.setState({
          filters: newFilters ?  newFilters : filters
        },()=>{
          self.filterQS(queryString.parse(self.state.filters, {arrayFormat: 'bracket', parseNumbers: true}));
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
    const filters = queryString.stringify({consoles, genres}, {arrayFormat: 'bracket', parseNumbers: true});
    this.props.history.push(`/dashboard/Game/Page/1/${filters}`)
  }

  filterQS(filter) {
    const consoles = filter.consoles ? filter.consoles : [];
    const genres = filter.genres ? filter.genres : [];
    let filteredList = this.props.gameList;
    if (consoles.length) {
      filteredList = filteredList.filter(game => {
        return consoles.filter(consoleId => {
          return parseInt(consoleId) === game.console_id;
        })[0]
      });
    }
    if (genres.length) {
      filteredList = filteredList.filter(game => {
        return genres.filter(genreId => {
          return parseInt(genreId) === game.genre_id;
        })[0]
      });
    }

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

  componentWillReceiveProps(newProps){
    const newPage = newProps.computedMatch.params.number;
    const newFilters = newProps.match.params.filter;
    if(newPage !== this.state.page){
      this.setState({
        page: newPage
      })
    }
    if(this.props.gameList){
      if(this.state.filters !== newFilters){
        this.setState({
          filters: newFilters
        },()=>{
          this.filterQS(queryString.parse(newFilters, {arrayFormat: 'bracket', parseNumbers: true}));
        })
      }
    }
  }

  updateList(){
    this.setState({
      gameList: this.props.gameList
    })
  }

  setDatabasePopup(value, status){

    this.setState({
        popupStatus: status,
        databasePopup: value
    })
  }

  render(){
    const gameList = this.state.gameList;
    return (
      <Tabs defaultIndex={this.state.tabIndex} id="dashboard">
      <BetModal filterOptions={this.props.filterOptions}
                filtersSelected={{consoles: [], genres: []}}
                toggleBetModal={this.toggleBetModal}
                open={this.state.betModalOpen}
                updateFilters={this.filterList}
                noErrors/>
        <Popups popupStatus={this.state.popupStatus} open={this.state.databasePopup} setPopup={this.setDatabasePopup}/>
        <i onClick={this.toggleMenu}className="fas fa-bars menu-btn"></i>
        <div className={`sideboard ${this.state.menuOpen ? 'show' : ''}`}>
          <h2>Retro Roulette</h2>
          <TabList  >
            <Tab onClick={()=>this.props.history.push('/Dashboard/Game')}><p>Games</p></Tab>
            <Tab onClick={()=>this.props.history.push('/Dashboard/Genre')}><p>Genres</p></Tab>
            <Tab onClick={()=>this.props.history.push('/Dashboard/Console')}><p>Consoles</p></Tab>
            <a alt="logout" href="/logout"><li><i className="fas fa-sign-out-alt logout"></i>Logout</li></a>
          </TabList>
        </div>
        <div className="dash-body">
            <h2>Dashboard</h2>
            <TabPanel>
                <div className="grid-wrapper">
                  {gameList ?
                    <GamesDashboard   {...this.props}
                    toggleMenu={this.toggleBetModal}
                    updateList={this.updateList}
                    filter={this.filterList}
                    page={this.state.page}
                    updateGameList={this.props.updateGameList}
                    deleteSingleGame={this.props.deleteSingleGame}
                    setDatabasePopup={this.setDatabasePopup}
                    gameList={this.state.gameList}/>

                    : <>loading</>}
                </div>
            </TabPanel>
            <TabPanel>
              <div className="grid-wrapper">
              {this.props.filterOptions.genres.length ?
                <GenreDashboard
                {...this.props}
                toggleMenu={this.toggleBetModal}
                page={this.state.page}
                />

                : <>loading</>}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid-wrapper">
              {this.props.filterOptions.consoles.length ?
                <ConsoleDashboard
                {...this.props}
                updateList={this.updateList}
                setDatabasePopup={this.setDatabasePopup}
                toggleMenu={this.toggleBetModal}
                page={this.state.page}
                />

                : <>loading</>}
              </div>
            </TabPanel>
        </div>
      </Tabs>
    );
  }

}


export default withRouter(Dashboard);
