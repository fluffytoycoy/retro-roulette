import React, {Component} from 'react';
import { CSSTransition } from 'react-transition-group';
import { FormContainer, Form, Field, Button } from 'ui-form-field';

class BetModal extends Component{
  constructor(props){
    super(props);
    this.state={
      consoles: [],
      genres: [],
    }
    this.test = this.test.bind(this)
  }

  test(values){
    console.log(values)
  }

  renderForm = (props) =>{
    const options=[
      {label: 'Gameboy', value: 'gameboy'},
      {label: 'Snes', value: 'Snes'},
      {label: 'Sega Genesis', value: 'sega genesis'},
      {label: 'NES', value: 'nes'},
      {label: 'sega master system', values: 'sega master system'},
      {label: 'Gameboy Color', values: 'gameboy color'}
    ]

    const genreOptions = [
      {label: 'action', value: 'action'},
      {label: 'fps',  value: 'fps'},
      {label: 'rpg', value: 'rpg'},
      {label: 'action-rpg', value: 'action-rpg'},
      {label: 'sports',  value: 'sports'},
      {label: 'Platform', value: 'platform'},
      {label: 'puzzle',  value: 'puzzle'},
      {label: 'adventure', value: 'adventure'},
      {label: 'gambling',  value: 'gambling'},
      {label: 'action', value: 'action'},
      {label: 'fps',  value: 'fps'},
      {label: 'rpg', value: 'rpg'},
      {label: 'action-rpg', value: 'action-rpg'},
      {label: 'sports',  value: 'sports'},
      {label: 'Platform', value: 'platform'},
      {label: 'puzzle',  value: 'puzzle'},
      {label: 'adventure', value: 'adventure'},
      {label: 'gambling',  value: 'gambling'},
    ]
    return(
      <Form>
        <h1>Pick Your Consoles</h1>
        <div className="divider"></div>
        <Field checkboxes options={options} name='consoles'/>
        <h1>Pick Your Genres</h1>
        <div className="divider"></div>
        <Field checkboxes options={genreOptions} name='genres'/>
        <Button type="submit"/>
      </Form>

    )
  }



  render(){

    return (
      <CSSTransition
        in={this.props.open}
        timeout={{exit:500}}
        classNames="bet-modal"
        unmountOnExit>
          <div className="bet-modal">
            <div className="modal-wrapper">
              <div className="modal">
                <div className="close-icon" onClick={this.props.toggleBetModal}>x</div>
                <FormContainer onSubmit={this.test}  initialValues={{consoles: ['gameboy', 'nes'], genres: []}} render={this.renderForm}/>
              </div>
            </div>
          </div>
      </CSSTransition>
    );
  }

}



export default BetModal;
