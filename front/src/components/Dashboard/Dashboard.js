import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './Dashboard.scss';
import GamesDash from './GamesDash/GamesDash'
import BetModal from '../HomePage/BetSection/BetModal'
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
      filters: {
        consoles: undefined,
        genres: undefined
      }

    }
    this.filterList = this.filterList.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.toggleBetModal = this.toggleBetModal.bind(this)
  }

  componentWillMount(){
    if(!this.props.gameList){
      var self = this
      const filters = this.state.filters;
      axios.get('/api/testAuth',{
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`
        }
      })
      .then(response=>{
        self.props.setGameList(response.data)
        const newFilters = self.props.match.params.filter;
        self.setState({
          filters: newFilters ?  queryString.parse(newFilters, {arrayFormat: 'bracket', parseNumbers: true}) : filters
        },()=>{
          self.filterQS(self.state.filters);
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
    // console.log(genres.length)
    this.filterQS({consoles, genres})
    const filters = queryString.stringify({consoles, genres}, {arrayFormat: 'bracket', parseNumbers: true});
    this.props.history.push(`/dashboard/Page/0/${filters}`)

  }

  filterQS(filter) {
    console.log('everytime')
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
    const newFilters = queryString.parse(newProps.match.params.filter, {arrayFormat: 'bracket', parseNumbers: true});
    const {consoles, genres} = newFilters;
    if(newPage != this.state.page){
      console.log(newPage)
      this.setState({
        page: newPage
      })
    }
    if(this.props.gameList){
      this.filterQS(newFilters)
    }
  }

  render(){
    const gameList = this.state.gameList;
    return (
      <Tabs id="dashboard">
      <BetModal filterOptions={this.props.filterOptions}
                filtersSelected={{}}
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
                  {gameList ?
                    <GamesDash   {...this.props}
                    toggleMenu={this.toggleBetModal}
                    filter={this.filterList}
                    page={this.state.page}
                    gameList={this.state.gameList}/>
                    : <>loading</>}
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
