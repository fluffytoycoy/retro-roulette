import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './Dashboard.scss';
import Button from '@material-ui/core/Table';
import GamesDash from './GamesDash/GamesDash'
import axios from 'axios';

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state={
      menuOpen: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  componentWillMount(){

  }

  toggleMenu(){
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  render(){
    return (
      <Tabs id="dashboard">
        <i onClick={this.toggleMenu}class="fas fa-bars menu-btn"></i>
        <div className={`sideboard ${this.state.menuOpen ? 'show' : ''}`}>
          <h2>Retro Roulette</h2>
          <TabList>
            <Tab><p>Games</p></Tab>
            <Tab><p>Genres</p></Tab>
            <Tab><p>Consoles</p></Tab>
            <a alt="logout" href="/logout"><Tab><i class="fas fa-sign-out-alt logout"></i>Logout</Tab></a>
          </TabList>
        </div>
        <div className="dash-body">
        <h2>Dashboard</h2>
          <TabPanel>
              <div className="grid-wrapper">
                <div className="header"></div>
                <GamesDash/>
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


export default Dashboard;
