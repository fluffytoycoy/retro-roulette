import React, {Component} from 'react';
import { Link, animateScroll as  scroller } from 'react-scroll';
import './SlotMachine.scss';
import Slider from "react-slick";
import Timer from 'react-compound-timer'
import {getRandomInt} from '../Utils/RandNum/RandNum'




const withTimer = timerProps => WrappedComponent => wrappedComponentProps => (
  <Timer {...timerProps}>
    {timerRenderProps =>
      <WrappedComponent {...wrappedComponentProps} timer={timerRenderProps} />}
  </Timer>
);

class STimer extends React.Component {
  constructor(props){
    super(props);
    this.reset = this.reset.bind(this)
  }
    componentDidMount(props) {
      this.props.reset(this.reset);
        const { setCheckpoints, stop, reset, setDirection, setTime, start } = this.props.timer;
        const {setRotationsCompleted} = this.props
        setCheckpoints([
            {
                time: 5000,
                callback: () => {setRotationsCompleted(); stop()},
            },
        ]);
    }

    reset(){
      const { setCheckpoints, stop, reset, setDirection, setTime, start } = this.props.timer;
      reset();
      start();
    }
    render() {
        return (
              <Timer.Seconds />
        );
    }
}

const SlotTimer = withTimer()(STimer);


export default SlotTimer