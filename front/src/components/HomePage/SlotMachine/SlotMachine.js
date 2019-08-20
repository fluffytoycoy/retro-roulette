import React, {Component} from 'react';
import './SlotMachine.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {consoleToSlotImg} from '../../Utils/SlotMachine/SlotMachineMapper';

class SlotMachine extends Component{
  constructor(props){
    super(props);
    this.state={
      selectedSystemId: undefined,
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
    if(!newProps.slotFinished){
      if (newProps.game && newProps.rotationsCompleted) {
        this.setState({
          autoPlay: false,
          selectedSystemId: consoleToSlotImg(newProps.game.console),
        },()=>{
          this.props.setSlotFinished();
        })
      //else if the ajax call returned undefined && rotationsCompleted
      //stop roulette and set no matching data to true
      } else if (!newProps.validReturn && newProps.rotationsCompleted){
        this.setState({
          autoPlay: false,
          noMacthingData: true,
          selectedSystemId: 0,
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
      selectedItem: this.state.selectedSystemId
    }

    return (
      <>
        <div className={`slot-machine  ${this.state._isMounted ? 'fade-in': ''}`}>
          <div className={`scroll`}>
            <Carousel {...settings} >
              <img alt="gameboy" src="/img/game_boy.png"/>
              <img alt="roulette logo" src="/img/retro_logo.png"/>
              <img alt="gameboy color" src="/img/game_boy_color.png"/>
              <img alt="nes"src="/img/nes.png"/>
              <img alt="snes" src="/img/snes.png"/>
              <img alt="master system" src="/img/master_system.png"/>
              <img alt="genesis" src="/img/genesis.png"/>
            </Carousel>
          </div>
        </div>
      </>
    );
  }

}

export default SlotMachine;
