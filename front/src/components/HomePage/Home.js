import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Home.scss';
import axios from 'axios';

class Home extends Component{
  constructor(){
    super();
  }

componentWillMount(){
  axios.get('api/test')
  .then(response=>{
    console.log(response)
  }).catch(error=>{
    console.log(error)
  })
}



  render(){
    return (
      <div id="home">
        home
      </div>
    );
  }

}

export default Home;
