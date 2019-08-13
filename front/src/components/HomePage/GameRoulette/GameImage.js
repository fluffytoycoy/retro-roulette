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
      <img  alt="game cover" src="https://z7v6x4c5.stackpathcdn.com/storage/attachments/monthly_2017_02/58abe801b40ed_FatalFury(USA).png.2031ba08b6e2988e926aa14848b45f73.png"/>
    </div>
  }

}

export default GameSection;
