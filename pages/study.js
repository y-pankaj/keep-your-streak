import React, { useState, useEffect } from "react";
import Timer from "../components/timer";
import Navbar from "../components/navbar";

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
      <div className="flex justify-center items-center w-screen h-screen">
        <div>
          <Timer time={time} setTime={setTime} running={running} />
          <button onClick={() => setRunning((running) => !running)}>
            {running ? "Reset" : "Start"}
          </button>
        </div>
      </div>
    </>
  );
}
