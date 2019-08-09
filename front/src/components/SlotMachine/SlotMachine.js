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
      autoPlay: true,
      selectedSystem: ''
    }
    this.click = this.click.bind(this)
  }

componentWillMount(){
  // <div data-system="gameboy" className="exit"><img src="https://www.stickpng.com/assets/images/5a6a3c53ab538104d4a30e32.png"/></div>
  // <div data-system="gameboy-color"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Game_Boy_Color_logo.svg/1280px-Game_Boy_Color_logo.svg.png"/></div>
  // <div data-system="nes"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/NES_logo.svg/1280px-NES_logo.svg.png"/></div>
  // <div data-system="snes"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/SNES_logo.svg/1280px-SNES_logo.svg.png"/></div>
}

scrollTo() {

}


  click(){

    this.setState({
      autoPlay: !this.state.autoPlay,
      selectedSystem: getRandomInt(4)
    })
  }

  render(){
    const settings = {
      showArrows: false,
      showThumbs: false,
      showStatus: false,
      showIndicators: false,
      autoPlay: this.state.autoPlay,
      interval: 200,
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
      gameboy: 3,
    }

    return (
      <>
      <div className="slot-machine">
        <div className={`scroll ${this.state.autoPlay ? '': 'selected'}`}>
          <Carousel {...settings} >
            <div data-system="gameboy" className="exit"><img src="https://www.stickpng.com/assets/images/5a6a3c53ab538104d4a30e32.png"/></div>
            <div data-system="gameboy-color"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Game_Boy_Color_logo.svg/1280px-Game_Boy_Color_logo.svg.png"/></div>
            <div data-system="nes"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/NES_logo.svg/1280px-NES_logo.svg.png"/></div>
            <div data-system="snes"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/SNES_logo.svg/1280px-SNES_logo.svg.png"/></div>
          </Carousel>
        </div>
      </div>
      <div  onClick={this.click }className="btn"></div>
      </>
    );
  }

}

export default SlotMachine;
