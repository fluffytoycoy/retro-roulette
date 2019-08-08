import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Home from './components/HomePage/Home';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
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
  };

  render() {
    return (
      <Router>
      <ScrollToTop >
				<Header {...this.state}/>
					<Switch>
						<Route exact  path="/" component={Home} {...this.props}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/logout" component={Logout}/>
            <PrivateRoute path="/dashboard" component={Home}/>
            <Route component={NotFound}/>
				</Switch>
        <Footer/>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
