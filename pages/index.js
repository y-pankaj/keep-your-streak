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

  if (loading) return <div>loading...</div>;

  return (
    <>
      <div className="absolute z-0 m-auto h-full w-full py-14">
        <div className="table mx-auto">
          <div className="table-row-group">
            <Calendar setDate={setDate} />
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
      <div className="absolute py-16 w-full h-full bg-opacity-50 bg-gray-100">
        <DateInfo date={date} todoList={todoList} setTodoList={setTodoList} />
      </div>
    </>
  );
}
