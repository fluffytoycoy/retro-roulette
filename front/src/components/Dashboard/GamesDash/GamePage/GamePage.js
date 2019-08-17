import React from 'react';
//import PropTypes from "prop-types";


class GameDash extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedGame: this.props.selectedGame,
      gameExists: true
    }
  }
  componentDidMount() {

      if (!this.state.selectedGame) {
        const game = gameListBS(this.props.gameList, parseInt(this.props.match.params.gameId), 0, this.props.gameList.length-1);
        console.log(game)
        if(game){
          this.setState({
            selected: game
          })
        }else{
          this.setState({
            gameExists: false
          })
        }
      }

      function gameListBS(arr, gameId, start, end) {

        // Base Condtion
        if (start > end) return false;

        // Find the middle index
        let mid = Math.floor((start + end) / 2);

        // Compare mid with given key x
        if (arr[mid].id === gameId) {
          console.log(arr[mid], 'adsfsdfasdfasdfasfasfd')
          return arr[mid];
        }

        // If element at mid is greater than x,
        // search in the left half of mid
        if (arr[mid].id > gameId)
          return gameListBS(arr, gameId, start, mid - 1);
        else
          // If element at mid is smaller than x,
          // search in the right half of mid
          return gameListBS(arr, gameId, mid + 1, end);
      }
    }

  render(){
    return(<>
      {this.state.gameExists ? <>game</> : <>no game</>}</>
    );
  }
}



export default GameDash;