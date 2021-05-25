import React from "react";

export default function TodoDisplayField({ todo, todoList, setTodoList }) {
  function deleteTodo() {
    setTodoList(
      todoList.filter((currentTodo) => currentTodo.createdAt !== todo.createdAt)
    );
    const body = JSON.stringify({ createdAt: todo.createdAt });
    const result = fetch("/api/todo", {
      method: "DELETE",
      body: body,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((rejected) => console.log(rejected));
  }

  // change the done property of the todo
  function handleCheckbox() {
    let updatedDone;
    let updatedTodoList = [...todoList];
    for (var i = 0; i < todoList.length; i++) {
      if (updatedTodoList[i].createdAt == todo.createdAt) {
        updatedTodoList[i].done = !updatedTodoList[i].done;
        updatedDone = updatedTodoList[i].done;
        break;
      }
    }
    setTodoList(updatedTodoList);

    const body = JSON.stringify({
      createdAt: todo.createdAt,
      done: updatedDone,
    });
    const result = fetch("/api/todo", {
      method: "PUT",
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
          {todo.done ? (
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
            className={`text-lg break-words ${todo.done ? "line-through" : ""}`}
          >
            {todo.task}
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
