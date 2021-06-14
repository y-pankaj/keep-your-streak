import React from "react";
import PropTypes from "prop-types";

export default function DailyListDisplayField({ date, task, setDailyList }) {
  function deleteTask() {
    var thisDate = date.getDate();

    setDailyList((dailyList) => {
      const updatedDailyList = JSON.parse(JSON.stringify(dailyList));
      updatedDailyList[thisDate] = updatedDailyList[thisDate].filter(
        (thisTask) => thisTask.createdAt !== task.createdAt
      );
      return updatedDailyList;
    });

    const body = JSON.stringify({
      createdAt: task.createdAt,
    });
    fetch("/api/dailylist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((rejected) => console.log(rejected));
  }

  // change the done property of the todo
  function handleCheckbox() {
    const thisDate = date.getDate();
    let updatedDoneValue;
    setDailyList((dailyList) => {
      const updatedDailyList = JSON.parse(JSON.stringify(dailyList));
      for (var i = 0; i < updatedDailyList[thisDate].length; i++) {
        if (updatedDailyList[thisDate][i].createdAt == task.createdAt) {
          updatedDailyList[thisDate][i].done =
            !updatedDailyList[thisDate][i].done;
          updatedDoneValue = updatedDailyList[thisDate][i].done;
          break;
        }
      }
      return updatedDailyList;
    });

    const body = JSON.stringify({
      createdAt: task.createdAt,
      done: updatedDoneValue,
    });
    fetch("/api/dailylist", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((rejected) => rejected);
  }

  return (
    <div className="flex justify-between py-2 px-4 border-t-2 border-b-2 border-transparent hover:border-yellow-800">
      <div className="space-x-4 flex items-start">
        <div className="pt-1">
          {task.done ? (
            <input
              type="checkbox"
              onClick={handleCheckbox}
              className="h-4 w-4"
              defaultChecked
            />
          ) : (
            <input
              type="checkbox"
              onClick={handleCheckbox}
              className="h-4 w-4"
            />
          )}
        </div>
        <div>
          <span
            className={`text-lg break-words ${task.done ? "line-through" : ""}`}
          >
            {task.task}
          </span>
        </div>
      </div>
      <button
        className="w-6 h-6 hover:bg-gray-300 rounded-full"
        onClick={deleteTask}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

DailyListDisplayField.propTypes = {
  date: PropTypes.object,
  task: PropTypes.object,
  setDailyList: PropTypes.func,
};
