import React, {Component} from 'react';


class BettingSection extends Component{
  constructor(props){
    super(props);
    this.state={}
  }

componentWillMount(){

}

  render(){
    return (
      <>
        <div className="text-block">
          <h1>Place your bets</h1>
          <p>Placing your bet will let you select which console or consoles will show up in the roulette.</p>
          <p>In addtion you can cross off genres you don't want such as Sports, RPGs, Racing, ect.</p>
          <p>The cards are in your hands, Ante up.</p>
        </div>
        <div onClick={this.props.toggleBetModal} className="hero-btn">Bet
        </div>
      </>
    );
  }

}

export default BettingSection;
