"use client";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import Image from "next/image";
import { auth } from "@/lib/firebase/config";

export default function UserNav() {
  const [user, loading] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  console.log(user);
  return (
    <div className="fixed top-6 right-6 z-50">
      {user ? (
        <button onClick={() => auth.signOut()}>
          <Image
            src={user.photoURL || ""}
            height={72}
            width={72}
            className={"rounded-full border-4 border-yellow-400"}
            alt={"User Profile Picture"}
          />
        </button>
      ) : (
        <button onClick={() => signInWithGoogle()}>Not Signed In</button>
      )}
    </div>
  );
}
