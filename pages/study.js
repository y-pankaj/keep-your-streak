import React, { useState, useEffect, useRef } from "react";
import { getSession } from "next-auth/client";
import Timer from "../components/timer";
import Navbar from "../components/navbar";
import Spotify from "../components/spotify";

export default function Study() {
  const [time, setTime] = useState(10);
  const [running, setRunning] = useState(false);
  const maxTimeRef = useRef(time);

  useEffect(() => {
    let intervalId;
    if (running) {
      intervalId = setInterval(tick, 1000);
    }
    return () => {
      clearInterval(intervalId);
      setTime((time) => {
        if (time != 0) {
          return maxTimeRef.current;
        }
        return 0;
      });
    };
  }, [running]);

  function tick() {
    setTime((time) => {
      if (time > 0) {
        return time - 1;
      } else {
        setRunning((running) => !running);
        timerOver();
        return 0;
      }
    });
  }

  function timerOver() {
    const body = { maxTime: maxTimeRef.current, date: new Date() };
    fetch("/api/timer", {
      method: "POST",
      body: JSON.stringify(body),
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
          <Timer
            time={time}
            setTime={setTime}
            running={running}
            maxTimeRef={maxTimeRef}
          />
          <button
            className="w-72 bg-yellow-300 rounded-md py-1"
            onClick={() => setRunning((running) => !running)}
          >
            <span className="text-2xl">{running ? "Abort" : "Start"}</span>
          </button>
        </div>
        <div>
          <Spotify />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: { session },
    };
  }
}
