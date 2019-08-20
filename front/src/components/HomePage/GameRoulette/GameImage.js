import React, {Component} from 'react';
import './GameSection.scss';


class GameSection extends Component{
  constructor(props) {
    super(props)
    this.mountStyle = this.mountStyle.bind(this)
    this.state ={ //base css
      show: true,
      style :{
        opacity: 0,
        transform: "scale(.5)",
        transition: 'all 1s ease',
      }
    }
  }

  mountStyle() { // css for mount animation
    this.setState({
      style: {
        opacity: 1,
        transform: 'scale(1)',
        transition: 'all 1s ease',
      }
    })
  }

  componentDidMount(){
    setTimeout(this.mountStyle, 500) // call the into animation
  }

  render(){
    return this.state.show &&
    <div style={this.state.style} onTransitionEnd={this.transitionEnd}>
    {  this.props.gameImg ? <img  alt="game cover" src={this.props.gameImg}/> : <>no img for this game</>}
    </div>
  }

}

export default GameSection;
