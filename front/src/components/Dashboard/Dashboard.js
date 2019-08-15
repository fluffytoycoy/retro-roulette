import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './Dashboard.scss';
import axios from 'axios';

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  componentWillMount(){

  }

  render(){
    return (
      <Tabs id="dashboard">
        <div className="sideboard">
          <h2>Retro Roulette</h2>
          <TabList>
            <Tab>Games</Tab>
            <Tab>Genres</Tab>
            <Tab>Consoles</Tab>
          </TabList>
        </div>
        <div className="dash-body">
        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
        </div>
      </Tabs>
    );
  }

}


export default Dashboard;
