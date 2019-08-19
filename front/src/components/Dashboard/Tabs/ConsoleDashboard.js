import React from 'react';
//import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import EnhancedTableBody from './ConsolePage/Table/EnhancedTableBody';
import GamePage from './GamePage/GamePage';

function ConsoleDash(props){
  const [selectedGame, setSelectedGame] = React.useState(undefined);
  return (<>
    <GameTabHandler  {...props}
      updateGameList={props.updateGameList}
      deleteSingleGame={props.deleteSingleGame}
      setDatabasePopup={props.setDatabasePopup}
      selectedGame={selectedGame}
      setSelectedGame={setSelectedGame}
      consoles={props.filterOptions.consoles}
      />
    </>
  );
}

function GameTabHandler(props){
  console.log(props.match.path)
  switch (props.match.path){
    case '/Dashboard/:Tab/Edit/:id':
    return <GamePage {...props} />
    case '/Dashboard/:Tab/AddConsole':
    return <GamePage {...props} addGame />
    default:
    return <EnhancedTableBody {...props}/>;
  }
}
export default ConsoleDash;
