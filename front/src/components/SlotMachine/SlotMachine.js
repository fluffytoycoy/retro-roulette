import React, {Component} from 'react';
import { Link, animateScroll as  scroller } from 'react-scroll';
import './SlotMachine.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Slider from "react-slick";
import {getRandomInt} from '../Utils/RandNum/RandNum'

class SlotMachine extends Component{
  constructor(props){
    super(props);
    this.state={
      autoPlay: false,
      selectedSystem: 0,
      _isMounted: false
    }
    this.click = this.click.bind(this)
    this.spin = this.spin.bind(this)
  }

componentWillMount(){

}

componentDidMount(){
  //timeout function is needed to fix scrolling issue
  setTimeout(
    this.spin, 0
  )
}

  spin(){
    this.setState({
      autoPlay: !this.state.autoPlay,
      _isMounted: true
    })
  }

  click(){

    this.setState({
      autoPlay: !this.state.autoPlay,
      selectedSystem: getRandomInt(6)
    })
  }

  render(){
    const settings = {
      showArrows: false,
      showThumbs: false,
      showStatus: false,
      showIndicators: false,
      autoPlay: this.state.autoPlay,
      interval: 150,
      transitionTime: 100,
      infiniteLoop: true,
      axis: "vertical",
      stopOnHover: false,
      selectedItem: this.state.selectedSystem
    }

    const gameMap ={
      gameboyColor: 0,
      nes: 1,
      snes: 2,
      sms: 3,
      gen: 4,
      gameboy: 4,
    }

    return (
      <>
      <div className={`slot-machine  ${this.state._isMounted ? 'fade-in': ''}`}>
        <div className={`scroll ${this.state.autoPlay ? '': 'selected'}`}>
          <Carousel {...settings} >
            <div data-system="gameboy" className="exit">
              <img src="https://www.stickpng.com/assets/images/5a6a3c53ab538104d4a30e32.png"/>

            </div>
            <div data-system="gameboy-color"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Game_Boy_Color_logo.svg/1280px-Game_Boy_Color_logo.svg.png"/></div>
            <div data-system="nes"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/NES_logo.svg/1280px-NES_logo.svg.png"/></div>
            <div data-system="snes"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/SNES_logo.svg/1280px-SNES_logo.svg.png"/></div>
            <div data-system="sms"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Sega-master-system-logo.png"/></div>
            <div data-system="gen"><img src="https://pikointeractive.com/wp-content/uploads/2014/03/sega_genesis_logo_by_overxbound-d5r5d1q.png"/></div>

          </Carousel>
          <div className="shadow"></div>
        </div>
        <div  onClick={this.click }className="btn"></div>
      </div>

      </>
    );
  }

}

export default SlotMachine;
