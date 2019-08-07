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
        <div className="hero">
          <div className="sign-wrapper">
            <img className="lights-on" src="/img/retro_sign.png"/>
            <img className="lights-off" src="/img/retro_sign_off.png"/>
          </div>
          <div className="btn-wrapper">
            <div className="hero-btn">Place Your Bets</div>
          </div>
        </div>
      </div>
    );
  }

}

export default Home;
