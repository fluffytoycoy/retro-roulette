import React from 'react';
//import PropTypes from "prop-types";

import EnhancedTableBody from './ConsolePage/Table/EnhancedTableBody';
import ConsolePage from './ConsolePage/ConsolePage';

function ConsoleDash(props){
  const [selectedConsole, setSelectedConsole] = React.useState(undefined);
  return (<>
    <GameTabHandler  {...props}
      updateGameList={props.updateGameList}
      deleteSingleGame={props.deleteSingleGame}
      setDatabasePopup={props.setDatabasePopup}
      selectedConsole={selectedConsole}
      setSelectedConsole={setSelectedConsole}
      consoles={props.filterOptions.consoles}
      />
    </>
  );
}

function GameTabHandler(props){
  switch (props.match.path){
    case '/Dashboard/:Tab/Edit/:id':
    return <ConsolePage {...props} />
    case '/Dashboard/:Tab/AddConsole':
    return <ConsolePage {...props} addGame />
    default:
    return <EnhancedTableBody {...props}/>;
  }
}
export default ConsoleDash;
