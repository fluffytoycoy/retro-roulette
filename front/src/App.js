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
    this.updateFilters = this.updateFilters.bind(this);
    this.updateGameList = this.updateGameList.bind(this);
    this.deleteSingleGame = this.deleteSingleGame.bind(this);
    this.creatNewGame = this.creatNewGame.bind(this);
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

  updateGameList(game) {
    const gameIndex = this.findGameIndex(game);
    this.setState({
      gameList: [
        ...this.state.gameList.slice(0, gameIndex),
        Object.assign({}, this.state.gameList[gameIndex], this.normalizeGameData(game)),
        ...this.state.gameList.slice(gameIndex + 1)
      ]
    },()=> console.log(this.state.gameList))
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

  creatNewGame(game){
    this.setState({
      gameList: [...this.state.gameList, this.normalizeGameData(game)]
    })
  }

  normalizeGameData(game){
    console.log(game)
    game.console_id = parseInt(game.console_id);
    game.genre_id = parseInt(game.genre_id);
    game.genre = this.state.filterOptions.genres.filter(genre => genre.value === game.genre_id)[0]
    console.log(game.genre)
    game.console = this.state.filterOptions.consoles.filter(genre => genre.value === game.console_id)[0].label

    return game;
  }

  render() {
    return (
      <Router>
					<Switch>
						      <Route exact  path="/" render={props => <Layout><Home {...props} filterOptions={this.state.filterOptions} filtersSelected={this.state.filtersSelected} updateFilters={this.updateFilters}/></Layout>} />
                  <Route exact path="/login" render={(props) => <Login {...props} isLoggedIn={this.state.isLoggedIn} login={this.handleAuth} />}/>
                  <Route exact path="/logout" render={(props) => <Logout {...props} isLoggedIn={this.state.isLoggedIn} logout={this.handleAuth} />}/>

                  <PrivateRoute exact path="/Dashboard/" component={Dashboard} {...this.props} setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList}/>
                  <PrivateRoute exact path="/Dashboard/:Tab" component={Dashboard} {...this.props} setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList}/>
                  <PrivateRoute exact path="/Dashboard/:Tab/Page/:number" component={Dashboard} {...this.props} setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList}/>
                  <PrivateRoute exact path="/Dashboard/:Tab/Page/:number/:filter" component={Dashboard} {...this.props} setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList}/>
                  <PrivateRoute exact path="/Dashboard/:Tab/Edit/:id" component={Dashboard} {...this.props} deleteSingleGame={this.deleteSingleGame} updateGameList={this.updateGameList} setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList}/>
                  <PrivateRoute exact path="/Dashboard/:Tab/AddGame" component={Dashboard} {...this.props} creatNewGame={this.creatNewGame} setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList}/>

                  <PrivateRoute exact path="/Dashboard/:Tab/AddConsole" component={Dashboard} {...this.props}setGameList={this.setGameList} filterOptions={this.state.filterOptions} gameList={this.state.gameList}   />
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
