import React from "react";

export default function TodoDisplayField(props) {
  function handleClick() {
    console.log(props.todo._id);
    props.setTodoList(
      props.todoList.filter((currentTodo) => currentTodo._id !== props.todo._id)
    );
  }
  return (
    <div className="flex justify-between py-2 px-4 border-t-2 border-b-2 border-transparent hover:border-yellow-800">
      <div className="space-x-4 flex items-end">
        <div className="">
          <input type="checkbox" value="Bike" className="h-4 w-4" />
        </div>

        <span className="text-lg">{props.todo.task}</span>
      </div>
      <button
        className="w-6 h-6 hover:bg-gray-300 rounded-full"
        onClick={handleClick}
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
