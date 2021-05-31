import React from "react";
import Todo from "./todo/todo";
import DateStats from "./date-stats";
import PropTypes from "prop-types";

export default function DateInfo({ date, timerData, todoList, setTodoList }) {
  const displayDate =
    date.getDate() +
    " " +
    date.toLocaleString("default", { month: "short" }) +
    " '" +
    date.getFullYear().toString().substr(-2);

  return (
    <div className="w-10/12 sm:w-8/12 lg:w-7/12 xl:w-6/12 m-auto bg-yellow-500 rounded-md z-10">
      <div className="bg-yellow-600 flex justify-between items-center rounded-t-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 ml-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <div
          tabIndex="1"
          className="p-2 text-xl font-mono focus:bg-yellow-500 focus:rounded-t-xl"
        >
          {displayDate}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      <div>
        <DateStats timerData={timerData} date={date} />
      </div>
      {/* <div>
        <Todo todoList={todoList} setTodoList={setTodoList} />
      </div> */}
    </div>
  );
}

DateInfo.propTypes = {
  date: PropTypes.object,
  timerData: PropTypes.object,
  todoList: PropTypes.array,
  setTodoList: PropTypes.any,
};
