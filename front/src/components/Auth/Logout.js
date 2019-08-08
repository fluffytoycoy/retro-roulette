import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component{
  constructor(){
    super();
    this.state = {
    }
  }

  componentWillMount(){
     localStorage.removeItem('jwtToken');
     this.props.logout(localStorage.getItem('jwtToken'))
  }

  render(){
    return (
      <Redirect to="/"/>
    );
  }

}

export default Logout;
