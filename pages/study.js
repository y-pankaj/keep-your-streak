import React, { useState, useEffect } from "react";
import Timer from "../components/timer";
import Navbar from "../components/navbar";
import Spotify from "../components/spotify";
export default function Study() {
  const [time, setTime] = useState(10);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (running) {
      intervalId = setInterval(tick, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [running]);

  function tick() {
    setTime((time) => {
      if (time > 0) {
        return time - 1;
      } else {
        setRunning((running) => !running);
        return 0;
      }
    });
  }

  return (
    <>
      <Navbar />
      <div
        className="flex flex-col justify-center items-center 
          space-y-5 pb-2 w-screen h-screen bg-stone-henge bg-cover overflow-scroll"
      >
        <div className="flex flex-col items-center space-y-2">
          <Timer time={time} setTime={setTime} running={running} />
          <button
            className="w-72 bg-yellow-300 rounded-md py-1"
            onClick={() => setRunning((running) => !running)}
          >
            <span className="text-2xl">{running ? "RESET" : "START"}</span>
          </button>
        </div>
        <div>
          <Spotify />
        </div>
      </div>
    </>
  );
}
