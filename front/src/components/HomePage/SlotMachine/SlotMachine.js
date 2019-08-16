import React, {Component} from 'react';
import './SlotMachine.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {consoleToSlotImg} from '../../Utils/SlotMachine/SlotMachineMapper';

class SlotMachine extends Component{
  constructor(props){
    super(props);
    this.state={
      selectedSystem: undefined,
      _isMounted: false,
      autoPlay: false,
      noMacthingData: false
    }
    this.reset = this.reset.bind(this)
  }

  componentWillMount(){

  }

  componentDidMount(){
  //timeout 0 function is needed to fix mounting animations
    this.props.setReset(this.reset);
  setTimeout(() => {
    this.setState({
      _isMounted: true,
      autoPlay: true
    })
    }, 0)
}

  reset(){
    //reStarts the roulette
    this.setState({
      autoPlay: true,
      rotationsCompleted: false,
      noMacthingData: false
    })
  }

  componentWillReceiveProps(newProps) {
    //if slot is finished do nothing
    //else if game exists && rotationsCompleted
    //stop the rotation on selected game and set slot to finished
    console.log(newProps)
    if(!newProps.slotFinished){
      if (newProps.game && newProps.rotationsCompleted) {
        this.setState({
          autoPlay: false,
          selectedSystem: consoleToSlotImg(newProps.game.console),
        },()=>{
          this.props.setSlotFinished();
        })
      //else if the ajax call returned undefined && rotationsCompleted
      //stop roulette and set no matching data to true
      } else if (!newProps.validReturn && newProps.rotationsCompleted){
        this.setState({
          autoPlay: false,
          noMacthingData: true,
          selectedSystem: 0,
        })
        this.props.setSlotFinished();
      }
    }
  }

  shouldComponentUpdate(newProps){
    return this.props.open === newProps.open ? true : false
  }

  render(){

    const settings = {
      showArrows: false,
      showThumbs: false,
      showStatus: false,
      showIndicators: false,
      autoPlay: this.state.autoPlay,
      interval: 150,
      swipeable: false,
      transitionTime: 200,
      infiniteLoop: true,
      axis: "vertical",
      stopOnHover: false,
      selectedItem: this.state.selectedSystem
    }

    return (
      <>
        <div className={`slot-machine  ${this.state._isMounted ? 'fade-in': ''}`}>
          <div className={`scroll`}>
            <Carousel {...settings} >
              <img alt="gameboy" src="https://www.stickpng.com/assets/images/5a6a3c53ab538104d4a30e32.png"/>
              <img alt="roulette logo" src="https://i.imgur.com/BNF73pY.png"/>
              <img alt="gameboy color" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Game_Boy_Color_logo.svg/1280px-Game_Boy_Color_logo.svg.png"/>
              <img alt="nes"src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/NES_logo.svg/1280px-NES_logo.svg.png"/>
              <img alt="snes" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/SNES_logo.svg/1280px-SNES_logo.svg.png"/>
              <img alt="master system" src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Sega-master-system-logo.png"/>
              <img alt="genesis" src="https://pikointeractive.com/wp-content/uploads/2014/03/sega_genesis_logo_by_overxbound-d5r5d1q.png"/>
            </Carousel>
          </div>
        </div>
      </>
    );
  }

}

export default SlotMachine;
