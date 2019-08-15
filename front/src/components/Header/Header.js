import React from 'react';
//import {Link} from 'react-router-dom';
import './Header.scss';
import axios from 'axios';

function Header(props){
  function test(){
    axios.get('/api/testAuth',{
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`
      }
    })
    .then(response=>{
      console.log(response)
    })
  }

    return (
      isLoggedIn() ?
      <div id="header">
        <a href="/logout">Logout</a>
        <div onClick={test}>test</div>
      </div>
      : <></>
    );
}

function isLoggedIn(){
  console.log(localStorage.getItem('jwtToken'));
  return localStorage.getItem('jwtToken');
}

export default Header;
