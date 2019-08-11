import React, {Component} from 'react';
import { Link, animateScroll as  scroller } from 'react-scroll';
import './GameSection.scss';

import {getRandomInt} from '../Utils/RandNum/RandNum'

class GameSection extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  componentWillMount(){

  }

  componentDidMount(){

}

  reset(){

  }

  componentWillReceiveProps(newProps) {

  }



  render(){
    const {game, slotFinished} = this.props;
    return (
        <div className="game-section">
          {slotFinished ?
            <div>
              <img className="sega" src="https://z7v6x4c5.stackpathcdn.com/storage/attachments/monthly_2017_02/58abe801b40ed_FatalFury(USA).png.2031ba08b6e2988e926aa14848b45f73.png"/>
            </div>
            : <h1>?</h1>
          }
        </div>
    );
  }

}

export default GameSection;
