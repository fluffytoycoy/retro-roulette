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
      altImg: undefined,
    }
    this.toggleAltImg = this.toggleAltImg.bind(this)
    this.submit = this.submit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentDidMount() {
      if (!this.state.selectedGame) {
        const game = gameListBS(this.props.gameList, parseInt(this.props.match.params.gameId), 0, this.props.gameList.length-1);
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
      console.log(e.target.value)
      this.setState({
        altImg: e.target.value,
      })
    }
    submit(game){
      game.id = this.state.selectedGame.id;
      game.img_url = this.state.altImg
      console.log(game)
      axios.post('/api/updateGame', game,{
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`,
        }
      }).then(response=>{
        console.log(response)
        if(response.status == "204"){
          this.props.updateGameList(game)
        }
      }).catch(error=>{
        console.log(error)
      })
    }

    cancel(e){
      this.setState({
        selectedGame: this.state.selectedGame
      })
    }
    delete(){
      this.props.deleteSingleGame(this.state.selectedGame);
      this.props.history.goBack();
    }
    test = (props) =>{
      return(
        <Form await onUpdate={()=>{this.toggleAltImg(props.values.img_url)}}>
          <Field input name='title'/>
          <Field select options={this.props.filterOptions.consoles} name='console_id'/>
          <Field select options={this.props.filterOptions.genres} name="genre_id"/>
          <label>Image Url</label>
          <input type="text" value={this.state.altImg} onChange={this.toggleAltImg}/>
          <div className='btn-bar'>
            <Button variant="contained" className='cancel' onClick={this.cancel}>Cancel</Button>
            <Button variant="contained" color="primary" className='submit' type="submit">SAVE</Button>
          </div>
        </Form>
      )
    }

  render(){
    const game = this.state.selectedGame
    return(
      <>
        {this.state.gameExists ?
        <section id="game-page">
          <div>
            <div className="col">
              <img src={this.state.altImg}/>
            </div>
            <div className="col info">
              <h2>{game.title}</h2>
              <p>{game.console}</p>
              <p>{game.genre}</p>
              <FormContainer
                onSubmit={this.submit}
                initialValues={{title: game.title, console_id: game.console_id, genre_id: this.state.selectedGame.genre_id, img_url: game.img_url}}
                render={this.test}/>
                <Button variant="contained" color="secondary" onClick={this.delete} className="delete">Delete</Button>
            </div>

          </div>
        </section>
          :
          <div style={{textAlign: 'center'}}>no game exist with that id</div>}

      </>
    );
  }
}

function ImageUpdater(props){
  if(props.imageUrl){
      props.toggleAltImg(props.imageUrl)
  }
  return(null)
}

export default GameDash;
