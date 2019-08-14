import React from 'react';
import './GameSection.scss';
import GamePlaceHolder from './GamePlaceHolder';
import GameImage from './GameImage';


function GameSection(props){
    const {game, slotFinished, validReturn} = props;
    return (
        <div className="game-section">
          {(slotFinished && validReturn)
            ? <GameImage mounted={slotFinished} gameImg={game.img_url}/>
            : <GamePlaceHolder mounted={!slotFinished}/>}
        </div>
    );
}

export default GameSection;
