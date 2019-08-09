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
    componentDidMount(props) {
        const { setCheckpoints, stop, setDirection, setTime, start } = this.props.timer;
        const {setRotationsCompleted} = this.props
        setCheckpoints([
            {
                time: 5000,
                callback: () => {setRotationsCompleted(); stop()},
            },
        ]);
    }
    render() {
        return (
            null
        );
    }
}

const SlotTimer = withTimer()(STimer);


export default SlotTimer