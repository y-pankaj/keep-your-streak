import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function CalendarDate({
  setDate,
  toggleTodo,
  today,
  dateForCalendarBox,
  dailyList,
  timerData,
}) {
  const [completedItemsCount, setCompletedItemsCount] = useState();
  const [thisDayTimerData, setThisDayTimerData] = useState();

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

  useEffect(() => {
    if (dateForCalendarBox && dateForCalendarBox in dailyList) {
      const thisDayList = dailyList[dateForCalendarBox];
      var completedCount = 0;
      for (let i = 0; i < thisDayList.length; i++) {
        if (thisDayList[i].done) {
          completedCount = completedCount + 1;
        }
      }
      setCompletedItemsCount(completedCount + "/" + thisDayList.length);
    } else {
      setCompletedItemsCount(null);
    }
  }, [dailyList]);

  useEffect(() => {
    if (dateForCalendarBox && timerData && dateForCalendarBox in timerData) {
      setThisDayTimerData(secondsToHms(timerData[dateForCalendarBox].time));
    } else {
      setThisDayTimerData(null);
    }
  }, [timerData]);
  return (
    <div
      onClick={() => {
        var thisDate = new Date();
        thisDate.setDate(dateForCalendarBox);
        setDate(thisDate);
        if (dateForCalendarBox) {
          toggleTodo();
        }
      }}
      className={`table-cell h-32 w-32 rounded-md border-4 p-auto
                      ${
                        dateForCalendarBox === null
                          ? "bg-yellow-200"
                          : dateForCalendarBox === today
                          ? "bg-yellow-600"
                          : "bg-yellow-400"
                      } 
                      `}
    >
      <h1 className="text-3xl">{dateForCalendarBox}</h1>

      <div>
        {completedItemsCount != null ? (
          <h2 className="text-center">{completedItemsCount}</h2>
        ) : (
          <h2 className="text-center">&nbsp;</h2>
        )}
      </div>

      <div className="invisible md:visible">
        {thisDayTimerData != null ? (
          <h2 className="text-center">{thisDayTimerData}</h2>
        ) : (
          <h2 className="text-center">&nbsp;</h2>
        )}
      </div>
    </div>
  );
}

CalendarDate.propTypes = {
  setDate: PropTypes.func,
  toggleTodo: PropTypes.func,
  today: PropTypes.number,
  dateForCalendarBox: PropTypes.number,
  dailyList: PropTypes.object,
  timerData: PropTypes.object,
};
