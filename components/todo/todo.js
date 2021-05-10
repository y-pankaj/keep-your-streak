import React from "react";
import TodoDisplayField from "./todo-display-field";
import TodoInputField from "./todo-input-field";

export default function Todo() {
  return (
    <div>
      <TodoDisplayField />
      <TodoDisplayField />
      <TodoDisplayField />
      <TodoDisplayField />
      <TodoDisplayField />
      <TodoInputField />
    </div>
  );
}
