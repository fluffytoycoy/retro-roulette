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
    this.updateSelectedFilters = this.updateSelectedFilters.bind(this);
    this.updateGameList = this.updateGameList.bind(this);
    this.deleteSingleGame = this.deleteSingleGame.bind(this);
    this.creatNewGame = this.creatNewGame.bind(this);
    this.creatNewConsole = this.creatNewConsole.bind(this);
    this.updateConsoleList = this.updateConsoleList.bind(this);
    this.deleteSingleConsole = this.deleteSingleConsole.bind(this);
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

  updateSelectedFilters(consoles, genres){
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

  updateGameList(game) {
    const gameIndex = this.findGameIndex(game);
    this.setState({
      gameList: [
        ...this.state.gameList.slice(0, gameIndex),
        Object.assign({}, this.state.gameList[gameIndex], game),
        ...this.state.gameList.slice(gameIndex + 1)
      ]
    })
  }

  deleteSingleGame(game){
    const index = this.findGameIndex(game);
    this.setState({
      gameList: [...this.state.gameList.slice(0, index), ...this.state.gameList.slice(index + 1)]
    })
  }

  findGameIndex(game){
    return this.state.gameList.findIndex(list=> list.id === game.id);
  }

  creatNewGame(game) {
    this.setState({
      gameList: [...this.state.gameList, game]
    })
  }

  updateConsoleList(gameConsole){
    const index = this.findConsoleIndex(gameConsole);
    const consoleList = this.state.filterOptions.consoles;
    let filterOptions = this.state.filterOptions;
    filterOptions.consoles = [
      ...consoleList.slice(0, index),
      Object.assign({}, consoleList[index], gameConsole),
      ...consoleList.slice(index + 1)
    ];
    this.updateSelectedFilters(filterOptions.consoles, filterOptions.genres);
  }

  creatNewConsole(gameConsole){
    const consoleList = this.state.filterOptions.consoles;
    let filterOptions = this.state.filterOptions;
    console.log(filterOptions)
    filterOptions.consoles = [...consoleList, gameConsole]
    this.updateSelectedFilters(filterOptions.consoles, filterOptions.genres);
  }

  deleteSingleConsole(gameConsole){
    const index = this.findConsoleIndex(gameConsole);
    const consoleList = this.state.filterOptions.consoles;
    let filterOptions = this.state.filterOptions;
    filterOptions.consoles = [...consoleList.slice(0, index), ...consoleList.slice(index + 1)];
    this.updateSelectedFilters(filterOptions.consoles, filterOptions.genres);
  }

  findConsoleIndex(gameConsole){
    return this.state.filterOptions.consoles.findIndex(list=> list.value === gameConsole.value);
  }
  render() {
    return (
      <Router>
					<Switch>
						      <Route exact  path="/" render={props => <Layout><Home {...props} filterOptions={this.state.filterOptions} filtersSelected={this.state.filtersSelected} updateFilters={this.updateSelectedFilters}/></Layout>} />
                  <Route exact path="/login" render={(props) => <Login {...props} isLoggedIn={this.state.isLoggedIn} login={this.handleAuth} />}/>
                  <Route exact path="/logout" render={(props) => <Logout {...props} isLoggedIn={this.state.isLoggedIn} logout={this.handleAuth} />}/>

                  <PrivateRoute exact path="/Dashboard/" component={Dashboard} {...this.props} setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList}/>
                  <PrivateRoute exact path="/Dashboard/:Tab" component={Dashboard} {...this.props} setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList}/>
                  <PrivateRoute exact path="/Dashboard/:Tab/Page/:number" component={Dashboard} {...this.props} setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList}/>
                  <PrivateRoute exact path="/Dashboard/:Tab/Page/:number/:filter" component={Dashboard} {...this.props} setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList}/>
                  <PrivateRoute exact path="/Dashboard/:Tab/Edit/:id" component={Dashboard} deleteSingleConsole={this.deleteSingleConsole} {...this.props} updateConsoleList={this.updateConsoleList} deleteSingleGame={this.deleteSingleGame} updateGameList={this.updateGameList} setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList}/>
                  <PrivateRoute exact path="/Dashboard/:Tab/AddGame" component={Dashboard} {...this.props} creatNewGame={this.creatNewGame} setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList}/>

                  <PrivateRoute exact path="/Dashboard/:Tab/AddConsole" component={Dashboard} {...this.props} creatNewConsole={this.creatNewConsole} setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList}   />
                  <PrivateRoute exact path="/Dashboard/:Tab/AddGenre" component={Dashboard} {...this.props}setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList} />
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
