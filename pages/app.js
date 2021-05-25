import { useState, useEffect } from "react";
import Calendar from "../components/calendar";
import DateInfo from "../components/date-info";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import Navbar from "../components/navbar";

export default function App() {
  // const [session, loading] = useSession();

  const [date, setDate] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const result = fetch("/api/todo")
      .then((response) => response.json())
      .then((response) => {
        if (response.data) {
          setTodoList(response.data.todoList);
        }
      });
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
        <div className="absolute m-auto h-screen w-screen py-20 ">
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

          <DateInfo date={date} todoList={todoList} setTodoList={setTodoList} />
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