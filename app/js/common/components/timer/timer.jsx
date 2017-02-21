import React, { Component, PropTypes } from "react";
import moment from "moment";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft : this.props.timeLeft,
      hrs: 0,
      mins: 0,
      secs: 0
    };
    this.setRemainingTime = this.setRemainingTime.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { timeLeft } = nextProps;

    this.setState({
      timeLeft: timeLeft,
      hrs: 0,
      mins: 0,
      secs: 0
    });
  }

  componentDidMount() {
    this.interval = setInterval(this.setRemainingTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setRemainingTime() {
    console.log(this.state);
    const { timeLeft } = this.state;

    if ( typeof timeLeft === "number") {
       let secs = Math.floor((timeLeft / 1000) % 60);
      let mins = Math.floor((timeLeft / 1000 / 60) % 60);
      let hrs = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);

      this.setState({
        timeLeft: timeLeft - 1000,
        hrs: hrs,
        mins: mins,
        secs: secs
      });
    }
   

    if(timeLeft === 0) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { timeLeft, hrs, mins, secs } = this.state;

    return (
      <div className="timer row">
        <div className="col s4">
          <h3>{hrs} :</h3>
          <div>Hours</div>
        </div>
        <div className="col s4">
          <h3>{mins} :</h3>
          <div>Minutes</div>
        </div>
        <div className="col s4">
          <h3>{secs}</h3>
          <div>Seconds</div>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  timeLeft: PropTypes.number
};

export default Timer;