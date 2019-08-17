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
    }
    this.submit = this.submit.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  submit(filters){
    this.props.toggleBetModal();
    console.log(filters)
    this.props.updateFilters(filters.consoles, filters.genres)
  }

  cancel(){
    this.props.toggleBetModal();
  }

  renderForm = ({errors}) =>{
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
        <Button disabled={this.props.open ? false : true} className='cancel' onClick={this.cancel}>Cancel</Button>
        <Button disabled={this.props.open ? false : true} className='submit' type="submit"/>
        </div>
      </Form>

    )
  }

  render(){
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
                <FormContainer onSubmit={this.submit}
                initialValues={{consoles: this.props.filtersSelected.consoles, genres: this.props.filtersSelected.genres}}
                render={this.renderForm}
                validationSchema={this.props.noErrors ? '' : schema}/>
              </div>
            </div>
          </div>
      </CSSTransition>
      : <></>
    );
  }

}



export default BetModal;
