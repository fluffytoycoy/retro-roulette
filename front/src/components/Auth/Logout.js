import React, {Component} from 'react';
import { FormContainer, Form, Field, Button } from "ui-form-field";
import { Redirect } from 'react-router-dom';
import * as Yup from "yup";
import axios from 'axios';

class Logout extends Component{
  constructor(){
    super();
    this.state = {
    }
  }

  componentWillMount(){
     localStorage.removeItem('jwtToken');
  }

  render(){
    return (
      <Redirect to="/"/>
    );
  }

}

export default Logout;
