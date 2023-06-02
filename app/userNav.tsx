"use client";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import Image from "next/image";
import { auth } from "@/lib/firebase/config";

export default function UserNav() {
  const [user, loading] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  console.log(user);
  return (
    <>
      {user ? (
        <button onClick={() => auth.signOut()}>
          <Image
            src={user.photoURL || ""}
            height={100}
            width={100}
            alt={"User Profile Picture"}
          />
        </button>
      ) : (
        <button onClick={() => signInWithGoogle()}>Not Signed In</button>
      )}
    </>
  );
}
