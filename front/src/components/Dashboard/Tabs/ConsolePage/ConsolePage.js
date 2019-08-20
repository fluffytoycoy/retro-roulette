import React from 'react';
import { FormContainer, Form, Field} from 'ui-form-field';
import Button from "@material-ui/core/Button";
import axios from 'axios';


class GameDash extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedConsole: this.props.selectedConsole,
      consoleExists: false,
    }
    this.updateGame = this.updateGame.bind(this)
    this.cancel = this.cancel.bind(this)
    this.delete = this.delete.bind(this)
    this.submitNewGame = this.submitNewGame.bind(this)
  }

    componentDidMount() {
      if (!this.state.selectedConsole) {
        const gameConsole = gameListBS(this.props.consoles, parseInt(this.props.match.params.id), 0, this.props.consoles.length-1);
        console.log(gameConsole)
        if(gameConsole){
          this.setState({
            selectedConsole: gameConsole,
            consoleExists: true,
          })
        }
      }else{
        this.setState({
          consoleExists: true,
          altImg: this.props.selectedConsole.img
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

        if(response.status === 200){
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
        if(response.status === 200){
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


    consoleForm = (props) =>{
      //const consoleOptions = [{value: '', label: 'Select a console'}, ...this.props.filterOptions.consoles]

      return(
        <Form>
          <Field required name='console'/>
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
            filterOptions={this.props.filterOptions.consoles}
            imgStyle={imgStyle}
            altImg={this.state.altImg}
            consoleForm={this.consoleForm}
            submit={this.submitNewGame}/>
          :
          <EditGame
            filterOptions={this.props.filterOptions.consoles}
            altImg={this.state.altImg}
            consoleForm={this.consoleForm}
            consoleExists={this.state.consoleExists}
            delete={this.delete}
            submit={this.updateGame}
            selectedConsole={this.state.selectedConsole}/>}
      </>
    );
  }
}

function AddGame(props){
  return(
    <section id="game-page">
      <div>
        <div className="col">
          <img alt="console"src={props.altImg}/>
        </div>
        <div className="col">
          <FormContainer
            initialValues={{console: ''}}
            onSubmit={props.submit}
            render={props.consoleForm}/>
        </div>
      </div>
    </section>
  )

}

function EditGame(props){
  const gameConsole = props.selectedConsole
  return(
    <>
      {props.consoleExists  ?
      <section id="game-page">
        <div>
          <div className="col">
            <img alt="console" src={props.altImg}/>
          </div>
          <div className="col info">
            <h2><b>{gameConsole.label}</b></h2>
            <div>
              <p></p>
            </div>
            <FormContainer
              onSubmit={props.submit}
              initialValues={{console: gameConsole.label}}
              render={props.consoleForm}/>
              <Button variant="contained" color="secondary" onClick={props.delete} className="delete">Delete</Button>
          </div>
        </div>
      </section>
        :
        <div style={{textAlign: 'center'}}>no genre exist with that id</div>}
    </>
  )
}

export default GameDash;
