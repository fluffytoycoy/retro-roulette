import React, {Component} from 'react';
import { Link, animateScroll as  scroller } from 'react-scroll';
import './GameSection.scss';
import GamePlaceHolder from './GamePlaceHolder';
import GameImage from './GameImage';


function GameSection(props){
    const {game, slotFinished} = props;
    return (
        <div className="game-section">
          {slotFinished
            ? <GameImage mounted={props.slotFinished}/>
            : <GamePlaceHolder mounted={!props.slotFinished}/>}
        </div>
    );
}

export default GameSection;
