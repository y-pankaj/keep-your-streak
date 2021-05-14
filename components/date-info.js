import React from "react";
import Todo from "./todo/todo";

export default function DateInfo(props) {
  return (
    <div className="w-6/12 m-auto bg-yellow-500 rounded-md z-10">
      <div className="bg-yellow-600 flex rounded-t-md">
        <div
          tabIndex="1"
          className="p-2 text-xl font-mono focus:bg-yellow-500 focus:rounded-t-xl"
        >
          TODO
        </div>
        <div
          tabIndex="1"
          className="p-2 text-xl font-mono focus:bg-yellow-500 focus:rounded-t-xl"
        >
          Journal
        </div>
        <div
          tabIndex="1"
          className="p-2 text-xl font-mono focus:bg-yellow-500 focus:rounded-t-xl"
        >
          Habits
        </div>
      </div>
      <div>
        <Todo todoList={props.todoList} setTodoList={props.setTodoList} />
      </div>
    </div>
  );
}
