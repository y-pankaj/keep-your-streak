import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function DateStats({ date, timerData }) {
  const [currentStats, setCurrentStats] = useState({ sessions: 0, time: 0 });
  useEffect(() => {
    const currentDate = date.getDate();
    if (currentDate in timerData) {
      const sessions = timerData[currentDate].sessions;
      const time = timerData[currentDate].time;
      setCurrentStats({ sessions: sessions, time: secondsToHms(time) });
    } else {
      setCurrentStats({ sessions: 0, time: secondsToHms(0) });
    }
  }, [date, timerData]);

  function secondsToHms(d) {
    d = Number(d);
    var h = String(Math.floor(d / 3600));
    var m = String(Math.floor((d % 3600) / 60));
    var s = String(Math.floor((d % 3600) % 60));

    // var hDisplay = h > 0 ? h + (h == 1 ? " hr: " : " hrs ") : "";
    // var mDisplay = m > 0 ? m + (m == 1 ? " min: " : " mins ") : "";
    // var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " secs") : "";

    var hDisplay = h.length == 1 ? "0" + h + ":" : h + ":";
    var mDisplay = m.length == 1 ? "0" + m + ":" : m + ":";
    var sDisplay = s.length == 1 ? "0" + s : s;
    var totalTime = hDisplay + mDisplay + sDisplay;
    return totalTime;
  }
  return (
    <div>
      <div className="flex flex-row justify-around py-2 text-xl">
        <span>Total study time: {currentStats.time}</span>
        {/* <span>No. of sessions: {currentStats.sessions}</span> */}
      </div>
    </div>
  );
}

DateStats.propTypes = {
  date: PropTypes.object,
  timerData: PropTypes.object,
};
