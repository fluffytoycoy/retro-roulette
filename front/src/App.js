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
import Footer from './components/Footer/Footer';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: !!localStorage.getItem('jwtToken'),
      gameList: undefined,
      filterOptions: {
        consoles: [],
        genres: [],
      },
      filtersSelected: {
        consoles: [],
        genres: [],
      },
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.setGameList = this.setGameList.bind(this);
    this.updateFilters = this.updateFilters.bind(this)
  };

  componentWillMount(){
    let self = this;
    axios.get('/api/filterInfo')
    .then(response=>{
      self.setState({
        filterOptions:{
          consoles: response.data.consoles,
          genres: response.data.genres
        },
        filtersSelected:{
          consoles: response.data.consoles.map(console=>(console.value)),
          genres: response.data.genres.map(genre=>(genre.value)),
        }
      })
    })
  }

  updateFilters(consoles, genres){
    this.setState({
      filtersSelected:{
        consoles: consoles,
        genres: genres
      }
    })
  }

  handleAuth(status){
    this.setState({
      isLoggedIn: status
    })
  }

  setGameList(gameList){
    this.setState({
      gameList: gameList
    })
  }

  render() {
    return (
      <Router>
					<Switch>
						      <Route exact  path="/" render={props => <Layout><Home {...props} filterOptions={this.state.filterOptions} filtersSelected={this.state.filtersSelected} updateFilters={this.updateFilters}/></Layout>} />
                  <Route exact path="/login" render={(props) => <Login {...props} isLoggedIn={this.state.isLoggedIn} login={this.handleAuth} />}/>
                  <Route exact path="/logout" render={(props) => <Logout {...props} isLoggedIn={this.state.isLoggedIn} logout={this.handleAuth} />}/>
                  <PrivateRoute exact path="/dashboard/" component={Dashboard} {...this.props} setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList}/>
                  <PrivateRoute exact path="/dashboard/Page/:number" component={Dashboard} {...this.props} setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList}/>
                  <PrivateRoute exact path="/dashboard/Page/:number/:filter" component={Dashboard} {...this.props} setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList}/>
            <Route component={NotFound}/>
				</Switch>
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
