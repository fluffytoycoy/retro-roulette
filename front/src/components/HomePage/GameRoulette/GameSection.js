import React, {Component} from 'react';
import { Link, animateScroll as  scroller } from 'react-scroll';
import './GameSection.scss';
import GamePlaceHolder from './GamePlaceHolder';
import GameImage from './GameImage';


class GameSection extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  componentWillMount(){
    console.log('testing', this.props)
  }

  componentDidMount(){

}

  reset(){

  }

  componentWillReceiveProps(newProps) {

  }

  isQuestionMarkMounted(){

  }

  render(){
    const {game, slotFinished} = this.props;
    return (
        <div className="game-section">
          {slotFinished 
            ? <GameImage mounted={this.props.slotFinished}/>
            : <GamePlaceHolder mounted={!this.props.slotFinished}/>}
        </div>
    );
  }

}

export default GameSection;
