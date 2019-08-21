import React from 'react';
import { FormContainer, Form, Field} from 'ui-form-field';
import Button from "@material-ui/core/Button";
import {buildConsoleFilterItem, buildDbConsoleObj} from '../Utils/ObjectMapper';
import axios from 'axios';


class GameDash extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedConsole: this.props.selectedConsole,
      consoleExists: false,
      altImg: ''
    }
    this.updateConsole = this.updateConsole.bind(this)
    this.cancel = this.cancel.bind(this)
    this.delete = this.delete.bind(this)
    this.submitNewConsole = this.submitNewConsole.bind(this)
  }

    componentDidMount() {
      if (!this.state.selectedConsole) {
        const gameConsole = gameListBS(this.props.consoles, parseInt(this.props.match.params.id), 0, this.props.consoles.length-1);
        if(gameConsole){
          this.setState({
            selectedConsole: gameConsole,
            consoleExists: true,
            altImg: gameConsole.img_url
          })
        }
      }else{
        this.setState({
          consoleExists: true,
          altImg: this.props.selectedConsole.img_url
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

    updateConsole(gameConsole) {
      const newFilter = buildConsoleFilterItem(this.state.selectedConsole.value, gameConsole.console, gameConsole.img_url);
      const newGameConsole = buildDbConsoleObj(this.state.selectedConsole.value, gameConsole.console, gameConsole.img_url);
      axios.post('/api/updateConsole', newGameConsole, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`,
        }
      }).then(response => {
        console.log(response)
        if (response.status === 204) {
          this.props.setDatabasePopup(true, 'success')
          this.props.updateConsoleList(newFilter)
          this.props.updateList();
          this.props.history.goBack();
        }
      }).catch(error => {
        this.props.setDatabasePopup(true, 'error')
      })
    }

    cancel(e){
      this.props.history.goBack();
    }

    delete(){
      axios.post('/api/deleteConsole', {id: this.state.selectedConsole.value},{
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`,
        }
      }).then(response=>{
        if(response.status === 200){
          this.props.setDatabasePopup(true, 'success')
          this.props.deleteSingleConsole(this.state.selectedConsole.value);
          this.props.history.goBack();
        }
      }).catch(error=>{
        this.props.setDatabasePopup(true, 'error')
      })
    }

    submitNewConsole(gameConsole){
      const newGameConsole = buildDbConsoleObj(null, gameConsole.console, gameConsole.img_url);
      axios.post('/api/createConsole', newGameConsole,{
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`,
        }
      }).then(response=>{
        if(response.status === 200){
          const newFilter = buildConsoleFilterItem(response.data.id, response.data.name, response.data.img_url);
          this.props.setDatabasePopup(true, 'success')
          this.props.creatNewConsole(newFilter)
          this.props.history.goBack();
        }
      }).catch(error=>{
        console.log(error)
        this.props.setDatabasePopup(true, 'error')
      })

    }

    toggleAltImg(e){
      this.setState({
        altImg: e.target.value,
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
    return(
      <>
        {this.props.addGame ?
          <AddGame
            filterOptions={this.props.filterOptions.consoles}
            altImg={this.state.altImg}
            consoleForm={this.consoleForm}
            submit={this.submitNewConsole}/>
          :
          <EditGame
            filterOptions={this.props.filterOptions.consoles}
            altImg={this.state.altImg}
            consoleForm={this.consoleForm}
            consoleExists={this.state.consoleExists}
            delete={this.delete}
            submit={this.updateConsole}
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
            initialValues={{console: '', img_url: ''}}
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
              initialValues={{console: gameConsole.label, img_url: gameConsole.img_url}}
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
