import React from "react";
import Navbar from "../components/navbar";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [session, loading] = useSession();

  if (loading) return <div></div>;

  if (session) {
    router.push("/app");
  }
  return (
    <div>
      <Navbar />
      <div className="w-screen h-screen flex flex-col items-center justify-center px-4 bg-stone-henge bg-cover">
        <div className="my-8">
          <h1 className="text-6xl text-center font-semibold">
            Productivity to the Moon{" "}
            <Image src="/rocket.png" width={50} height={50} />
          </h1>
        </div>
        <button className="py-2 text-2xl bg-yellow-300 rounded-lg w-48">
          Get Started
        </button>
      </div>
    </div>
  );
}
