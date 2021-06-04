import React from "react";
import PropTypes from "prop-types";
import TodoDisplayField from "./todo-display-field";
import TodoInputField from "./todo-input-field";

export default function Todo({ currentList, setCurrentList }) {
  return (
    <div>
      {currentList.tasks.map((task) => (
        <TodoDisplayField
          key={task.createdAt}
          task={task}
          currentList={currentList}
          setCurrentList={setCurrentList}
        />
      ))}
      <TodoInputField setCurrentList={setCurrentList} />
    </div>
  );
}

Todo.propTypes = {
  currentList: PropTypes.object,
  setCurrentList: PropTypes.func,
};
