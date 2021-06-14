import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DailyListDisplayField from "./daily-list-display-field";
import DailyListInputField from "./daily-list-input-field";

export default function DailyList({ date, dailyList, setDailyList }) {
  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    var thisDate = date.getDate();
    if (thisDate in dailyList) {
      setTaskList(dailyList[thisDate]);
    } else {
      setTaskList([]);
    }
  }, [dailyList, date]);
  return (
    <div>
      {taskList.map((task) => (
        <DailyListDisplayField
          key={task.createdAt}
          date={date}
          task={task}
          dailyList={dailyList}
          setDailyList={setDailyList}
        />
      ))}
      <DailyListInputField date={date} setDailyList={setDailyList} />
    </div>
  );
}

DailyList.propTypes = {
  date: PropTypes.object,
  dailyList: PropTypes.object,
  setDailyList: PropTypes.func,
};
