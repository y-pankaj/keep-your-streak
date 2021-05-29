import React from "react";
import PropTypes from "prop-types";

export default function Timer({ time, maxTimeRef, running, setTime }) {
  var seconds = time % 60;
  seconds = String(seconds).length == 1 ? `0${seconds}` : seconds;

  var minutes = Math.floor(time / 60);
  minutes = String(minutes).length == 1 ? `0${minutes}` : minutes;

  function increaseTimer() {
    setTime((time) => {
      maxTimeRef.current = time + 5 * 60;
      return time + 5 * 60;
    });
  }

  function decreaseTime() {
    setTime((time) => {
      if (time > 5 * 60) {
        maxTimeRef.current = time - 5 * 60;
        return time - 5 * 60;
      } else {
        maxTimeRef.current = 0;
        return 0;
      }
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col justify-between items-center">
          {!running ? (
            <button onClick={increaseTimer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          ) : (
            <div className="h-10 w-16"></div>
          )}
          <span className="text-9xl font-medium">{minutes}</span>
          {!running ? (
            <button onClick={decreaseTime}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          ) : (
            <div className="h-10 w-16"></div>
          )}
        </div>
        <div>
          <span className="text-9xl font-medium">:</span>
        </div>
        <div>
          <span className="text-9xl font-medium">{seconds}</span>
        </div>
      </div>
    </div>
  );
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  maxTimeRef: PropTypes.number,
  setTime: PropTypes.any,
  running: PropTypes.bool,
};
