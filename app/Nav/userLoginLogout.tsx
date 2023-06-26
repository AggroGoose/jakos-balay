"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export function UserLoginLogout() {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === "loading") {
    return <>...</>;
  }

  if (status === "authenticated") {
    return (
      <button className="main-usernav--button" onClick={() => signOut()}>
        <Image
          src={session?.user?.image ?? "/Knuckles.png"}
          fill={true}
          className={"main-usernav--img"}
          alt={"User Profile Picture"}
        />
      </button>
    );
  }

  return (
    <button
      className="main-usernav--login bg-yellow-400 pt-1 pb-1 pr-2 pl-2 border-2 border-black font-bold text-black rounded-lg"
      onClick={() => signIn()}
    >
      Sign In
    </button>
  );
}
