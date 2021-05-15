import React from "react";
import Navbar from "../components/navbar";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home() {
  const [session, loading] = useSession();

  function handleClick() {
    const result = fetch("http://localhost:3000/api/todo")
      .then((response) => response.json())
      .then((data) => console.log(data));
    // console.log(result.data);
  }
  return (
    <div>
      <Navbar />

      {!loading && !session && (
        <>
          <button onClick={() => signIn("google")}>Sign in</button>
        </>
      )}

      {!loading && session && (
        <>
          <img src={session.user.image} className="avatar" />
          <h1>{session.user.name}</h1>
          {JSON.stringify(session)}
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}

      <button onClick={handleClick}>Press</button>
    </div>
  );
}
