import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Home from './components/HomePage/Home';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/Routes/PrivateRoute';
import NotFound from './components/NotFound/NotFound';
//import SingleProduct from './components/SingleProductPage/SingleProduct';
import ScrollToTop from './components/Utils/Scroll/ScrollToTop';
import Footer from './components/Footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: !!localStorage.getItem('jwtToken')
    };
    this.handleAuth = this.handleAuth.bind(this);
  };

  handleAuth(status){
    this.setState({
      isLoggedIn: status
    })
  }

  render() {
    return (
      <Router>
      <ScrollToTop >
					<Switch>
						      <Route exact  path="/" render={props => <Layout><Home {...props} /></Layout>} />
                  <Route exact path="/login" render={(props) => <Login {...props} isLoggedIn={this.state.isLoggedIn} login={this.handleAuth} />}/>
                  <Route exact path="/logout" render={(props) => <Logout {...props} isLoggedIn={this.state.isLoggedIn} logout={this.handleAuth} />}/>
                  <PrivateRoute path="/dashboard" component={Dashboard}/>
            <Route component={NotFound}/>
				</Switch>
        </ScrollToTop>
      </Router>
    );
  }
}


const Layout = ({ children, state }) => (
    <div>
      <Header {...state} />
        {children}
      <Footer />
    </div>
  );

export default App;
