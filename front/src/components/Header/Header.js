import React from 'react';
//import {Link} from 'react-router-dom';
import './Header.scss';

function Header(props){
    return (
      isLoggedIn() ?
      <div id="header">
        <a href="/logout">Logout</a>
      </div>
      : <></>
    );
}

function isLoggedIn(){
  return localStorage.getItem('jwtToken');
}

export default Header;
