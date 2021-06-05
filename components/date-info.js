import React, { useState, useRef } from "react";
import Todo from "./todo/todo";
import DateStats from "./date-stats";
import PropTypes from "prop-types";
import DisplayLists from "./display-lists";
import Swal from "sweetalert2";

export default function DateInfo({ date, timerData, lists, setLists }) {
  const [currentList, setCurrentList] = useState(null);
  const displayListIdRef = useRef();
  const displayDate =
    date.getDate() +
    " " +
    date.toLocaleString("default", { month: "short" }) +
    " '" +
    date.getFullYear().toString().substr(-2);

  function deleteList() {
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
          const updatedList = lists.filter(
            (list) => list.id != displayListIdRef.current
          );
          return [...updatedList];
        });
        const body = JSON.stringify({ listId: displayListIdRef.current });
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

  return (
    <div className="w-10/12 sm:w-8/12 lg:w-7/12 xl:w-6/12 m-auto bg-yellow-500 rounded-md z-10">
      <div
        className={`bg-yellow-600 flex ${
          !currentList ? "justify-center" : "justify-between"
        }  items-center rounded-t-md`}
      >
        {currentList && (
          <svg
            onClick={() => setCurrentList(null)}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        )}

        <div
          tabIndex="1"
          className="p-2 text-xl font-mono focus:bg-yellow-500 focus:rounded-t-xl"
        >
          {!currentList ? `${displayDate}` : currentList.title}
        </div>
        {currentList && (
          <svg
            onClick={deleteList}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </div>
      <div>
        {!currentList ? (
          <DateStats timerData={timerData} date={date} />
        ) : (
          <div>
            <Todo currentList={currentList} setCurrentList={setCurrentList} />
          </div>
        )}
      </div>
      <div>
        {!currentList && (
          <DisplayLists
            lists={lists}
            setLists={setLists}
            currentList={currentList}
            setCurrentList={setCurrentList}
            displayListIdRef={displayListIdRef}
          />
        )}
      </div>

      {/* <div>
        <Todo todoList={todoList} setTodoList={setTodoList} />
      </div> */}
    </div>
  );
}

DateInfo.propTypes = {
  date: PropTypes.object,
  timerData: PropTypes.object,
  todoList: PropTypes.array,
  setTodoList: PropTypes.any,
  lists: PropTypes.array,
  setLists: PropTypes.any,
};
