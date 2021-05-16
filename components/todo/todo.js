import React, { useState } from "react";
import TodoDisplayField from "./todo-display-field";
import TodoInputField from "./todo-input-field";

export default function Todo(props) {
  // write logic for getting date from Mongo using Date prop

  return (
    <div>
      {props.todoList.map((todo) => (
        <TodoDisplayField
          key={todo.createdAt}
          todo={todo}
          setTodoList={props.setTodoList}
          todoList={props.todoList}
        />
      ))}
      <TodoInputField
        todoList={props.todoList}
        setTodoList={props.setTodoList}
      />
    </div>
  );
}
