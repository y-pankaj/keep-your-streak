import React from "react";
import PropTypes from "prop-types";

export default function CalendarDate({ setDate, toggleTodo, today, date }) {
  return (
    <div
      onClick={() => {
        var thisDate = new Date();
        thisDate.setDate(date);
        setDate(thisDate);
        toggleTodo();
      }}
      className={`table-cell h-32 w-32 rounded-md border-4 p-auto
                      ${
                        date === null
                          ? "bg-yellow-200"
                          : date === today
                          ? "bg-yellow-600"
                          : "bg-yellow-400"
                      } 
                      `}
    >
      <h1 className="text-3xl">{date}</h1>
    </div>
  );
}

CalendarDate.propTypes = {
  setDate: PropTypes.func,
  toggleTodo: PropTypes.func,
  today: PropTypes.any,
  date: PropTypes.any,
};
