import React from 'react';
//import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import EnhancedTableBody from './EnhancedTableBody';
import GamePage from './GamePage/GamePage';

function GameDash(props){
  const [selectedGame, setSelectedGame] = React.useState(undefined);
  return (<>
    {!props.match.params.gameId ? <EnhancedTableBody setSelectedGame={setSelectedGame}{...props}/> : <GamePage {...props} selectedGame={selectedGame}/>}
    </>
  );
}


export default GameDash;