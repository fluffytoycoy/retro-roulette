import React from 'react';
//import PropTypes from "prop-types";

import EnhancedTableBody from './GenrePage/Table/EnhancedTableBody';
import GenrePage from './GenrePage/GenrePage';

function GenreDash(props){
  const [selectedGenre, setSelectedGenre] = React.useState(undefined);
  return (<>
    <GameTabHandler  {...props}
      updateGameList={props.updateGameList}
      deleteSingleGame={props.deleteSingleGame}
      setDatabasePopup={props.setDatabasePopup}
      selectedGenre={selectedGenre}
      setSelectedGenre={setSelectedGenre}
      genres={props.filterOptions.genres}
      />
    </>
  );
}

function GameTabHandler(props){
  switch (props.match.path){
    case '/Dashboard/:Tab/Edit/:id':
    return <GenrePage {...props} />
    case '/Dashboard/:Tab/AddGenre':
    return <GenrePage {...props} addGame />
    default:
    return <EnhancedTableBody {...props}/>;
  }
}
export default GenreDash;
