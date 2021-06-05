import React, { useRef } from "react";
import PropTypes from "prop-types";

export default function DisplayLists({ lists, setLists, setCurrentList }) {
  const listTitleRef = useRef("");
  function addNewList(e) {
    e.preventDefault();
    if (listTitleRef.current) {
      const createdAt = new Date().getTime();
      const newList = {
        title: listTitleRef.current,
        id: createdAt,
        tasks: [],
      };

      setLists((lists) => {
        const updatedList = [...lists, newList];
        return updatedList;
      });
      const body = JSON.stringify(newList);
      fetch("/api/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: body,
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
    const inputListName = document.getElementById("inputListName");
    inputListName.value = "";
  }

  function handleValueChange(e) {
    listTitleRef.current = e.target.value;
  }

  function handleListClick(listId) {
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].id == listId) {
        setCurrentList(lists[i]);
        break;
      }
    }
  }
  return (
    <div>
      <div>
        <div>
          <h2 className="font-semibold text-xl text-center">
            Your Lists ({lists.length})
          </h2>
        </div>
        <div className="flex flex-col px-4 py-2 text-lg">
          {lists.map((list, key) => (
            <span
              className="cursor-pointer"
              onClick={() => handleListClick(list.id)}
              key={list.id}
            >
              {key + 1}. {list.title}
            </span>
          ))}
        </div>
      </div>
      <div className="flex space-x-1 mx-1 p-2">
        <input
          className="px-2"
          onKeyUp={handleValueChange}
          type="text"
          id="inputListName"
          placeholder="Add new list"
        />
        <button
          className="flex bg-purple-400 rounded-md p-1"
          onClick={addNewList}
        >
          <span className="hidden lg:inline-block">Add List</span>
          <span>
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
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

DisplayLists.propTypes = {
  lists: PropTypes.array,
  setLists: PropTypes.func,
  setCurrentList: PropTypes.func,
};
