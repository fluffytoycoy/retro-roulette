import React from 'react';
import './GamePage.scss';
import { FormContainer, Form, Field} from 'ui-form-field';
import Button from "@material-ui/core/Button";
import axios from 'axios';
//import PropTypes from "prop-types";


class GameDash extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedGame: this.props.selectedGame,
      gameExists: false,
      altImg: '',
    }
    this.toggleAltImg = this.toggleAltImg.bind(this)
    this.updateGame = this.updateGame.bind(this)
    this.cancel = this.cancel.bind(this)
    this.delete = this.delete.bind(this)
    this.submitNewGame = this.submitNewGame.bind(this)
  }

    componentDidMount() {
      if (!this.state.selectedGame) {

        const game = gameListBS(this.props.gameList, parseInt(this.props.match.params.id), 0, this.props.gameList.length-1);
        if(game){
          this.setState({
            selectedGame: game,
            gameExists: true,
            altImg: game.img_url
          })
        }
      }else{
        this.setState({
          gameExists: true,
          altImg: this.props.selectedGame.img_url
        })
      }

      function gameListBS(arr, gameId, start, end) {
        // Base Condtion
        if (start > end) return false;

        // Find the middle index
        let mid = Math.floor((start + end) / 2);

        // Compare mid with given key x
        if (arr[mid].id === gameId) {
          return arr[mid];
        }

        // If element at mid is greater than x,
        // search in the left half of mid
        if (arr[mid].id > gameId)
          return gameListBS(arr, gameId, start, mid - 1);
        else
          // If element at mid is smaller than x,
          // search in the right half of mid
          return gameListBS(arr, gameId, mid + 1, end);
      }
    }

    toggleAltImg(e){
      this.setState({
        altImg: e.target.value,
      })
    }

    updateGame(game){
      game.id = this.state.selectedGame.id;
      game.img_url = this.state.altImg
      axios.post('/api/updateGame', game,{
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`,
        }
      }).then(response=>{

        if(response.status === 204){
          this.props.setDatabasePopup(true, 'success')
          this.props.updateGameList(game)
          this.props.history.goBack();
        }
      }).catch(error=>{
        this.props.setDatabasePopup(true, 'error')
      })
    }

    cancel(e){
      this.props.history.goBack();
    }

    delete(){
      axios.post('/api/deleteGame', {id: this.state.selectedGame.id},{
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`,
        }
      }).then(response=>{
        if(response.status === 204){
          this.props.setDatabasePopup(true, 'success')
          this.props.deleteSingleGame(this.state.selectedGame);
          this.props.history.goBack();
        }
      }).catch(error=>{
        this.props.setDatabasePopup(true, 'error')
      })
    }

    submitNewGame(game){
      axios.post('/api/createGame', game,{
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`,
        }
      }).then(response=>{
        if(response.status === 200){
          this.props.setDatabasePopup(true, 'success')
          this.props.creatNewGame(response.data)
          //this.props.deleteSingleGame(this.state.selectedGame);
          //this.props.history.goBack();
        }
      }).catch(error=>{
        this.props.setDatabasePopup(true, 'error')
      })

    }


    gameForm = (props) =>{
      const consoleOptions = [{value: '', label: 'Select a console'}, ...this.props.filterOptions.consoles]
      const genreOptions = [{value: '', label: 'Select a genre'}, ...this.props.filterOptions.genres]
      return(
        <Form>
          <Field required  name='title'/>
          <Field required select  options={consoleOptions} name='console_id'/>
          <Field required select options={genreOptions} name="genre_id"/>
          <div>
            <label>Image Url</label>
            <input type="text" value={this.state.altImg ? this.state.altImg : ''} onChange={this.toggleAltImg}/>
          </div>
          <div className='btn-bar'>
            <Button variant="contained" className='cancel' onClick={this.cancel}>Cancel</Button>
            <Button variant="contained" color="primary" className='submit' type="submit">SAVE</Button>
          </div>
        </Form>
      )
    }


  render(){
    var imgStyle = {
      backgroundImage: 'url(' + this.state.altImg+ ')',
      backgroundSize: 'contain',
      height: '100%',
      width: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }
    return(
      <>
        {this.props.addGame ?
          <AddGame imgStyle={imgStyle} altImg={this.state.altImg} gameForm={this.gameForm} submit={this.submitNewGame}/>
          :
          <EditGame altImg={this.state.altImg} gameForm={this.gameForm} gameExists={this.state.gameExists} delete={this.delete} submit={this.updateGame} selectedGame={this.state.selectedGame}/>}
      </>
    );
  }
}

function AddGame(props){
  return(
    <section id="game-page">
      <div>
        <div className="col">
          <img alt="game cover" src={props.altImg}/>
        </div>
        <div className="col">
          <FormContainer

            onSubmit={props.submit}
            render={props.gameForm}/>
        </div>
      </div>
    </section>
  )

}

function EditGame(props){
  const game = props.selectedGame
  return(
    <>
      {props.gameExists  ?
      <section id="game-page">
        <div>
          <div className="col">
            <img alt="game cover" src={props.altImg}/>
          </div>
          <div className="col info">
            <h2><b>{game.title}</b></h2>
            <div>
              <p><b>Console</b>: {game.console}</p>
              <p><b>Genre</b>: {game.genre}</p>
            </div>
            <FormContainer
              onSubmit={props.submit}
              initialValues={{title: game.title, console_id: game.console_id, genre_id: game.genre_id, img_url: game.img_url}}
              render={props.gameForm}/>
              <Button variant="contained" color="secondary" onClick={props.delete} className="delete">Delete</Button>
          </div>

        </div>
      </section>
        :
        <div style={{textAlign: 'center'}}>no game exist with that id</div>}
    </>
  )
}

export default GameDash;
