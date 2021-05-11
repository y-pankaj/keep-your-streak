import React, { useState } from "react";
import TodoDisplayField from "./todo-display-field";
import TodoInputField from "./todo-input-field";

export default function Todo() {
  const [todoList, setTodoList] = useState([
    {
      _id: "dlfkjsfldsjf",
      task: "Random Todo",
      done: false,
    },
  ]);

  return (
    <div>
      {todoList.map((todo) => (
        <TodoDisplayField
          todo={todo}
          setTodoList={setTodoList}
          todoList={todoList}
        />
      ))}
      <TodoInputField todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}
