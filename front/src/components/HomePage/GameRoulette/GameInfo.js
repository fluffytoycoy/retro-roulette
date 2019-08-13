import React, {Component} from 'react';


class GameInfo extends Component{
  constructor(props) {
    super(props)
    this.mountStyle = this.mountStyle.bind(this)
    this.state ={ //base css
      show: true,
      style :{
        opacity: 0,
        height: 0,
        overflow: 'hidden',
        transition: 'all 1s ease',
      }
    }
  }

  componentWillReceiveProps(newProps) { // check for the mounted props
    if(!newProps.mounted)
      return this.unMountStyle() // call outro animation when mounted prop is false
    this.setState({ // remount the node when the mounted prop is true
      show: true
    })
    setTimeout(this.mountStyle, 500) // call the into animation
  }

  unMountStyle() { // css for unmount animation
    console.log('unmount style')
    this.setState({
      style: {
        opacity: 0,
        overflow: 'hidden',
        transition: 'all 1s ease',
      }
    })
  }

  mountStyle() { // css for mount animation
    this.setState({
      style: {
        opacity: 1,
        margin: '50px 0 0',
        overflow: 'hidden',
        transition: 'all 1s ease',
      }
    })
  }

  componentDidMount(){
    setTimeout(this.mountStyle, 500) // call the into animation
  }

  render(){
    return this.state.show &&
    <div style={this.state.style} onTransitionEnd={this.transitionEnd} className="game-info">
      <h1>The Revenge of Shinobi</h1>
      <h2>Platform: Sega</h2>
      <p>Genre: Action</p>
    </div>
  }

}

export default GameInfo;
