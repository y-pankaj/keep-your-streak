import React from "react";
export default function TodoInputField({ todoList, setTodoList }) {
  function handleEnterKey(e) {
    var keyCode = e.code || e.key;
    if (keyCode == "Enter") {
      const createdAt = new Date().getTime();
      const todo = {
        title: "Some really important work to finish",
      };
      const newTodo = {
        createdAt: createdAt,
        task: e.target.value,
        done: false,
      };
      setTodoList([...todoList, newTodo]);
      e.target.value = "";
      const res = fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  }

  return (
    <div className="flex justify-between items-center px-3 border-t-2 border-b-2 border-transparent hover:border-yellow-800">
      <span className="pr-3">
        <svg
          className="fill-current text-gray-600 h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </span>
      <input
        onKeyPress={handleEnterKey}
        type="text"
        placeholder="Add item"
        className="w-full h-11 bg-transparent placeholder-gray-600 outline-none text-lg"
      ></input>
    </div>
  );
}
