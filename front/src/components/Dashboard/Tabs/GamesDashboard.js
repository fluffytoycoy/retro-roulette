import React from 'react';
//import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import EnhancedTableBody from './GamePage/Table/EnhancedTableBody';
import GamePage from './GamePage/GamePage';

function GameDash(props){
  const [selectedGame, setSelectedGame] = React.useState(undefined);
  return (<>
    <GameTabHandler  {...props}
      updateGameList={props.updateGameList}
      deleteSingleGame={props.deleteSingleGame}
      setDatabasePopup={props.setDatabasePopup}
      selectedGame={selectedGame}
      setSelectedGame={setSelectedGame}/>
    </>
  );
}

function GameTabHandler(props){
  switch (props.match.path){
    // case '/Dashboard/:Tab/Edit/:id':
    // return <GamePage {...props} />
    // case '/Dashboard/:Tab/AddGame':
    // return <GamePage {...props} addGame />
    default:
    return <EnhancedTableBody {...props}/>;
  }
}
export default GameDash;
