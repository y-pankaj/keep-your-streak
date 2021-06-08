import React, { useRef } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

export default function DisplayLists({
  lists,
  setLists,
  setCurrentList,
  displayListIdRef,
}) {
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

  function deleteList(listId) {
    Swal.fire({
      title: "Delete the list?",
      // text: "You won't be able to revert this!",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCurrentList(null);
        setLists((lists) => {
          const updatedList = lists.filter((list) => list.id != listId);
          return [...updatedList];
        });
        const body = JSON.stringify({ listId: listId });
        fetch("/api/lists", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((rejected) => console.log(rejected));
        displayListIdRef.current = null;
      }
    });
  }

  function handleValueChange(e) {
    listTitleRef.current = e.target.value;
  }

  function handleListClick(listId) {
    displayListIdRef.current = listId;
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
            <div className="flex justify-between" key={list.id}>
              <span
                className="cursor-pointer w-4/5"
                onClick={() => handleListClick(list.id)}
              >
                {key + 1}. {list.title}
              </span>
              <button>
                <svg
                  onClick={() => deleteList(list.id)}
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
          ))}
        </div>
      </div>
      <div className="flex space-x-1 mx-1 p-2">
        <input
          className="px-2 w-5/6"
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
  displayListIdRef: PropTypes.object,
};
