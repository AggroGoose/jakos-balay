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
      <button onClick={() => signOut()}>
        <Image
          src={session?.user?.image ?? "/Knuckles.png"}
          height={72}
          width={72}
          className={"rounded-full border-4 border-yellow-400"}
          alt={"User Profile Picture"}
        />
      </button>
    );
  }

  return (
    <button
      className="bg-yellow-400 pt-1 pb-1 pr-2 pl-2 border-2 border-black font-bold text-black rounded-lg"
      onClick={() => signIn()}
    >
      Sign In
    </button>
  );
}
