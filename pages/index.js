import { useState, useEffect } from "react";
import Calendar from "../components/calendar";
import DateInfo from "../components/date-info";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home() {
  const [session, loading] = useSession();

  const [date, setDate] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const result = fetch("/api/todo")
      .then((response) => response.json())
      .then((response) => setTodoList(response.data.todoList));
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

  if (loading) return <div>loading...</div>;

  return (
    <div className="bg-purple-500">
      <div className="absolute z-0 m-auto h-screen w-screen py-14 ">
        <div className="table mx-auto">
          <div className="table-row-group">
            <Calendar setDate={setDate} toggleTodo={toggleTodo} />
          </div>
        </div>

        {/* {!loading && !session && (
        <>
          <button onClick={() => signIn('google')}>Sign in</button>
        </>
      )}

      {!loading && session && (
        <>
          <img src={session.user.image} className="avatar" />
          <h1>{session.user.name}</h1>
          {JSON.stringify(session)}
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )} */}
      </div>
      <div
        className="fixed overflow-auto py-16 w-full h-full bg-opacity-50 bg-gray-100 todo-container"
        onClick={checkTarget}
      >
        <button className="absolute right-8 top-8" onClick={toggleTodo}>
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
  );
}
