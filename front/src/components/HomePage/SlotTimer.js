import React, {Component} from 'react';
import Timer from 'react-compound-timer'





const withTimer = timerProps => WrappedComponent => wrappedComponentProps => (
  <Timer {...timerProps}>
    {timerRenderProps =>
      <WrappedComponent {...wrappedComponentProps} timer={timerRenderProps} />}
  </Timer>
);

class STimer extends Component {
  constructor(props){
    super(props);

    this.resetTimer = this.resetTimer.bind(this)
  }

    componentDidMount(props) {
        this.props.setReset(this.resetTimer);

        const { setCheckpoints, stop } = this.props.timer;
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
            null
        );
    }
}

const SlotTimer = withTimer({startImmediately: false})(STimer);


export default SlotTimer