import React, { useRef } from "react";
import PropTypes from "prop-types";

export default function TodoDisplayField({
  task,
  currentList,
  setCurrentList,
}) {
  const listIdRef = useRef(currentList.id);
  function deleteTodo() {
    setCurrentList((currentList) => {
      const updatedCurrentList = { ...currentList };
      updatedCurrentList.tasks = updatedCurrentList.tasks.filter(
        (thisTask) => thisTask.createdAt !== task.createdAt
      );
      return updatedCurrentList;
    });
    const body = JSON.stringify({
      listId: currentList.id,
      createdAt: task.createdAt,
    });
    fetch("/api/tasks", {
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
    let updatedDoneValue;
    let updatedTaskList = [...currentList.tasks];
    for (var i = 0; i < updatedTaskList.length; i++) {
      if (updatedTaskList[i].createdAt == task.createdAt) {
        updatedTaskList[i].done = !updatedTaskList[i].done;
        updatedDoneValue = updatedTaskList[i].done;
        break;
      }
    }
    setCurrentList((currentList) => {
      listIdRef.current = currentList.id;
      const updatedCurrentList = {
        ...currentList,
        tasks: updatedTaskList,
      };
      return updatedCurrentList;
    });

    const body = JSON.stringify({
      listId: listIdRef.current,
      createdAt: task.createdAt,
      done: updatedDoneValue,
    });
    fetch("/api/tasks", {
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
        onClick={deleteTodo}
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

TodoDisplayField.propTypes = {
  task: PropTypes.object,
  currentList: PropTypes.object,
  setCurrentList: PropTypes.func,
};
