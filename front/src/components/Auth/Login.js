import React, {Component} from 'react';
import { FormContainer, Form, Field, Button } from "ui-form-field";
import { Redirect } from 'react-router-dom';
import * as Yup from "yup";
import axios from 'axios';
import './Login.scss';


const schema = Yup.object().shape({
  username: Yup.string().required("Username is requried!"),
  password: Yup.string()
    .required("Password is required!")
});

class Login extends Component{
  constructor(){
    super();
    this.state = {
      form:{
        username: '',
        password: '',
      },
      isSubmitting: false,
      submitSuccess: false,
      submitFailure: false
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = (values) => {
    console.log(values)
      var self = this;
      this.setState({
        isSubmitting: true
      }, ()=>{
        axios.post('/api/login', values)
          .then(function (response) {
            console.log(response)
            localStorage.setItem('jwtToken', response.data.token);
            localStorage.setItem('role', response.data.role_id);
            self.setState({
              submitSuccess: true,
              submitFailure: false,
              isSubmitting: false,
            },()=>{
              self.props.login(true)
            })


          })
          .catch(function (error) {
            self.setState({
              isSubmitting: false,
              submitSuccess: false,
              submitFailure: true
            })
          });
      })

  };

  renderForm = (props) => {
    return(
        <Form >
          <Field name="username" placeholder="Username" />
          <Field type="password" name="password" placeholder="Email"/>
          <Button type="submit" disabled={this.state.isSubmitting} />
        </Form>
    );
  }

  form = () => {
    return (
      <>
        <h2>Log in</h2>
          <FormContainer validationSchema={schema} onSubmit={this.onSubmit} render={this.renderForm} initialValues={{username: '', password: ''}}/>
          <div className={`error ${this.state.submitFailure ? 'show' : ''}`}><p >Failure Submiting Contact Info</p><span>x</span></div>
      </>
    )
  }

  render(){
    return (
      this.props.isLoggedIn ?
      <Redirect to="/dashboard"/>
      :
      <div id="home">
        <div className="login">
          <div className={`form-card ${this.state.submitFailure ? '' : 'no-flex'}`}>
            {this.state.submitSuccess ? <Redirect to="/dashboard"/> : this.form()}
          </div>
        </div>
      </div>
    );
  }

}

export default Login;
