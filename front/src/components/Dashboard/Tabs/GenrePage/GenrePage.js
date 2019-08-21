import React from 'react';
import { FormContainer, Form, Field} from 'ui-form-field';
import Button from "@material-ui/core/Button";
import checkRoles from '../Utils/CheckRoles';
import axios from 'axios';


class GameDash extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedGenre: this.props.selectedGenre,
      genreExists: false,
    }
    this.updateGame = this.updateGame.bind(this)
    this.cancel = this.cancel.bind(this)
    this.delete = this.delete.bind(this)
    this.submitNewGame = this.submitNewGame.bind(this)
  }

    componentDidMount() {
      if (!this.state.selectedGenre) {
        const gameGenre = gameListBS(this.props.genres, parseInt(this.props.match.params.id), 0, this.props.genres.length-1);
        if(gameGenre){
          this.setState({
            selectedGenre: gameGenre,
            genreExists: true,
          })
        }
      }else{
        this.setState({
          genreExists: true,
          altImg: this.props.selectedGenre.img
        })
      }

      function gameListBS(arr, gameId, start, end) {
        // Base Condtion
        if (start > end) return false;

        // Find the middle index
        let mid = Math.floor((start + end) / 2);

        // Compare mid with given key x
        if (arr[mid].value === gameId) {
          return arr[mid];
        }

        // If element at mid is greater than x,
        // search in the left half of mid
        if (arr[mid].value > gameId)
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
        }
      }).catch(error=>{
        this.props.setDatabasePopup(true, 'error')
      })

    }


    genreForm = (props) =>{
      //const genreOptions = [{value: '', label: 'Select a genre'}, ...this.props.filterOptions.genres]
      return(
        <Form>
          <Field required name='genre'/>
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
          <AddGame
            filterOptions={this.props.filterOptions.genres}
            imgStyle={imgStyle}
            altImg={this.state.altImg}
            genreForm={this.genreForm}
            submit={this.submitNewGame}/>
          :
          <EditGame
            filterOptions={this.props.filterOptions.genres}
            altImg={this.state.altImg}
            genreForm={this.genreForm}
            genreExists={this.state.genreExists}
            delete={this.delete}
            submit={this.updateGame}
            selectedGenre={this.state.selectedGenre}/>}
      </>
    );
  }
}

function AddGame(props){
  return(
    <section id="game-page">
      <div className="genre">
        <div className="col">
          <FormContainer
            initialValues={{genre: ''}}
            onSubmit={()=>{checkRoles(props.submit)}}
            render={props.genreForm}/>
        </div>
      </div>
    </section>
  )

}

function EditGame(props){
  const gameGenre = props.selectedGenre
  return(
    <>
      {props.genreExists  ?
      <section id="game-page">
        <div className="genre">
          <div className="col">
            <h2><b>{gameGenre.label}</b></h2>
            <div>
              <p></p>
            </div>
            <FormContainer
              onSubmit={()=>{checkRoles(props.submit)}}
              initialValues={{genre: gameGenre.label}}
              render={props.genreForm}/>
              <Button variant="contained" color="secondary" onClick={()=>{checkRoles(props.delete)}} className="delete">Delete</Button>
          </div>
        </div>
      </section>
        :
        <div style={{textAlign: 'center'}}>no genre exist with that id</div>}
    </>
  )
}

export default GameDash;
