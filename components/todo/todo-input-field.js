import React from "react";
import ObjectID from "bson-objectid";
export default function TodoInputField(props) {
  function handleEnterKey(e) {
    var keyCode = e.code || e.key;
    if (keyCode == "Enter") {
      const newObjectId = new ObjectID();
      props.setTodoList([
        ...props.todoList,
        { _id: newObjectId, task: e.target.value, done: false },
      ]);
      e.target.value = "";
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
