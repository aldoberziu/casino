import React, { useState, useEffect } from "react";

const CountdownTimer = (props) => {
  const { time, timer } = props;
  const [seconds, setSeconds] = useState(time);
  const [isActive, setIsActive] = useState(timer);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      props?.handleTimer(seconds);
    } else if (isActive && seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
      props?.childTimer(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const startTimer = () => {
    setIsActive(true);
    setSeconds(time);
  };

  useEffect(() => {
    if (timer === true) {
      startTimer();
    }
  }, [timer]);

  return null;
};

export default CountdownTimer;
