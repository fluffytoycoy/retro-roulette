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
    return(
      <Form>
        <h1>Pick Your Consoles</h1>
        <div className="divider"></div>
        <Field checkboxes options={this.props.filterOptions.consoles} name='consoles'/>
        <h1>Pick Your Genres</h1>
        <div className="divider"></div>
        <Field checkboxes options={this.props.filterOptions.genres} name='genres'/>
        <Button type="submit"/>
      </Form>

    )
  }

  render(){
    const consoles = this.props.filtersSelected.consoles.map(console=>(console.value))
    const genres = this.props.filtersSelected.genres.map(genres=>(genres.value))

    return (
      this.props.filterOptions ?
      <CSSTransition
        in={this.props.open}
        timeout={{exit:500}}
        classNames="bet-modal"
        unmountOnExit>
          <div className="bet-modal">
            <div className="modal-wrapper">
              <div className="modal">
                <div className="close-icon" onClick={this.props.toggleBetModal}>x</div>
                <FormContainer onSubmit={this.test}  initialValues={{consoles: consoles, genres: genres}} render={this.renderForm}/>
              </div>
            </div>
          </div>
      </CSSTransition>
      : <>loading...</>
    );
  }

}



export default BetModal;
