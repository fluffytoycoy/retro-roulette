import React, {Component} from 'react';
import { Link, animateScroll as  scroller } from 'react-scroll';
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

    this.resetTimer = this.resetTimer.bind(this)
  }

    componentDidMount(props) {
        this.props.setReset(this.resetTimer);

        const { setCheckpoints, stop, reset, setDirection, setTime, start } = this.props.timer;
        const {setRotationsCompleted} = this.props;
        setCheckpoints([{
                time: 5000,
                callback: () => {setRotationsCompleted(); stop()},
            }]);
    }

    resetTimer(){
      const { reset, start } = this.props.timer;
      reset();
      start();
    }

    render() {
        return (
              <Timer.Seconds />
        );
    }
}

const SlotTimer = withTimer({startImmediately: false})(STimer);


export default SlotTimer