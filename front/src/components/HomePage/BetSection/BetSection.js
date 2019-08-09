import React, {Component} from 'react';


class BetSection extends Component{
  constructor(props){
    super(props);
    this.state={}
  }

componentWillMount(){

}

  render(){
    return (
      <>
      <div>
        <h1>High Roller</h1>
        <p>Going all in will select a random game from the NES, SNES, Gameboy, Sega Master System or Sega Genesis.</p>
        <p>All genres are included in the pool.</p>
        <p>Do you have the courage to go all in?</p>
      </div>
      <div onClick={this.props.AllIn} className="hero-btn all-in">
        All In
      </div>
      </>
    );
  }

}

export default BetSection;
