import React from 'react';


function BetBar(props){

    return (
      props.slotFinished ?
        <div className="btn-bar finished">
          <div onClick={props.toggleBetModal}><p>Change Bet</p></div>
          <div onClick={props.spinAgain}><p>Spin Again</p></div>
      </div>
      :
    <div className="btn-bar">Retro Roulette</div>
    );

}

export default BetBar;
