import React from "react";
import Todo from "./todo/todo";

export default function DateInfo() {
  return (
    <div className="w-10/12 m-auto bg-yellow-500 rounded-md">
      <div className="bg-yellow-600 flex rounded-t-md">
        <div
          tabIndex="1"
          className="p-2 text-xl font-mono focus:bg-yellow-700 focus:rounded-t-xl"
        >
          TODO
        </div>
        <div
          tabIndex="1"
          className="p-2 text-xl font-mono focus:bg-yellow-700 focus:rounded-t-xl"
        >
          Journal
        </div>
        <div
          tabIndex="1"
          className="p-2 text-xl font-mono focus:bg-yellow-700 focus:rounded-t-xl"
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
