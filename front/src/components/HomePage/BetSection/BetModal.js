import React, {Component} from 'react';
import { CSSTransition } from 'react-transition-group';

function BetModal(props){
  console.log(props.open)
    return (
      <CSSTransition
        in={props.open}
        timeout={{exit:500}}
        classNames="bet-modal"
        unmountOnExit>
          <div className="bet-modal">
            <div className="modal-wrapper">
              <div className="modal">
                <div onClick={props.toggleBetModal}>x</div>
                <div>
                  <h1>Pick Your Consoles</h1>
                  <div className="divider"></div>
                  <h1>Pick Your Genres</h1>
                  <div className="divider"></div>
                </div>
              </div>
            </div>
          </div>
      </CSSTransition>
    );

}

export default BetModal;
