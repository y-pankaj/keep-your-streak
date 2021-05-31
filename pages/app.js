import React, { useState, useEffect } from "react";
import Calendar from "../components/calendar";
import DateInfo from "../components/date-info";
import { getSession } from "next-auth/client";
import Navbar from "../components/navbar";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [todoList, setTodoList] = useState([]);
  const [timerData, setTimerData] = useState({});

  useEffect(() => {
    fetch("/api/todo", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.data) {
          setTodoList(response.data.todoList);
        }
      });
  }, []);

  useEffect(() => {
    const todayDate = new Date();
    const startDate = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      1
    ).setHours(0, 0, 0, 0);

    const endDate = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth() + 1,
      0
    ).setHours(23, 59, 59, 999);

    fetch("/api/timer?" + "start=" + startDate + "&" + "end=" + endDate, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.data) {
          const responseData = response.data.timer;
          const studySessions = {};
          for (let i = 0; i < responseData.length; i++) {
            const data = responseData[i];
            const date = new Date(data.date).getDate();
            const time = data.maxTime;
            if (date in studySessions) {
              studySessions[date].time = studySessions[date].time + time;
              studySessions[date].sessions = studySessions[date].sessions + 1;
            } else {
              studySessions[date] = { time: time, sessions: 1 };
            }
          }
          console.log(studySessions);
          setTimerData(studySessions);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function toggleTodo() {
    const todoContainer = document.querySelector(".todo-container");
    todoContainer.classList.toggle("hidden");
  }

  function checkTarget(e) {
    if (e.target.classList.contains("todo-container")) {
      toggleTodo();
    }
  }

  return (
    <>
      <Navbar />
      <div className="bg-purple-500">
        <div className="absolute m-auto w-screen py-20 bg-stone-henge bg-cover overflow-auto">
          <div className="table mx-auto">
            <div className="table-row-group">
              <Calendar setDate={setDate} toggleTodo={toggleTodo} />
            </div>
          </div>
        </div>
        <div
          className="fixed overflow-auto pt-28 pb-10 w-full h-full bg-opacity-50 bg-gray-100 todo-container"
          onClick={checkTarget}
        >
          <button className="absolute right-8 top-20" onClick={toggleTodo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 bg-yellow-400 rounded-full"
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

          <DateInfo
            date={date}
            todoList={todoList}
            setTodoList={setTodoList}
            timerData={timerData}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: { session },
    };
  }
}
