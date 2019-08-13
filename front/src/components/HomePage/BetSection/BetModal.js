import React, {Component} from 'react';
import { CSSTransition } from 'react-transition-group';
import * as Yup from "yup";
import { FormContainer, Form, Field, Button } from 'ui-form-field';

const schema = Yup.object().shape({
  consoles: Yup.array().required(),
  genres: Yup.array().required("At least one genrea must be selected"),
});

class BetModal extends Component{
  constructor(props){
    super(props);
    this.state={
      consoles: [],
      genres: [],
    }
    this.test = this.test.bind(this)
  }

  test(values, e){
    console.log(values, e)
  }

  cancel(){
    console.log('canned')
  }

  renderForm = ({errors}) =>{
    console.log(errors)
    return(
      <Form>
        <h1>Pick Your Consoles</h1>
        <div className="divider"></div>
        {errors.consoles ? <p>**At least one console must be selected**</p> : ''}
        <Field checkboxes options={this.props.filterOptions.consoles} name='consoles'/>
        <h1>Pick Your Genres</h1>
        <div className="divider"></div>
        {errors.genres ? <p>**At least one genre must be selected**</p> : ''}
        <Field checkboxes options={this.props.filterOptions.genres} name='genres'/>
        <div className='btn-bar'>
        <Button className='cancel' onClick={this.cancel}>Cancel</Button>
        <Button className='submit' type="submit"/>
        </div>
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
                <FormContainer onSubmit={this.test}
                initialValues={{consoles: consoles, genres: genres}}
                render={this.renderForm}
                validationSchema={schema}/>
              </div>
            </div>
          </div>
      </CSSTransition>
      : <>loading...</>
    );
  }

}



export default BetModal;
