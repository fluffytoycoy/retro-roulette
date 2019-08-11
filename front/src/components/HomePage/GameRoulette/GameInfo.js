import React, {Component} from 'react';
import { Link, animateScroll as  scroller } from 'react-scroll';


class GameInfo extends Component{
  constructor(props) {
    super(props)
    this.transitionEnd = this.transitionEnd.bind(this)
    this.mountStyle = this.mountStyle.bind(this)
    this.unMountStyle = this.unMountStyle.bind(this)
    this.state ={ //base css
      show: true,
      style :{
        opacity: 0,
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
    setTimeout(this.mountStyle, 10) // call the into animation
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
        overflow: 'hidden',
        transition: 'all 1s ease',
      }
    })
  }

  componentDidMount(){
    setTimeout(this.mountStyle, 10) // call the into animation
  }

  transitionEnd(){
    if(!this.props.mounted){ // remove the node on transition end when the mounted prop is false
      this.setState({
        show: false
      })
    }
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
