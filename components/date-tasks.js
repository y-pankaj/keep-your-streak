import React from "react";
import Todo from "./todo/todo";

export default function DateTasks() {
  return (
    <div className="w-10/12 m-auto bg-gray-500 rounded-md">
      <div className="bg-gray-600 flex rounded-t-md">
        <div
          tabIndex="1"
          className="p-2 text-xl font-mono focus:bg-gray-100 focus:rounded-t-xl"
        >
          TODO
        </div>
        <div
          tabIndex="1"
          className="p-2 text-xl font-mono focus:bg-gray-100 focus:rounded-t-xl"
        >
          Journal
        </div>
        <div
          tabIndex="1"
          className="p-2 text-xl font-mono focus:bg-gray-100 focus:rounded-t-xl"
        >
          Habits
        </div>
      </div>
      <div>
        <Todo />
      </div>
    </div>
  );
}
