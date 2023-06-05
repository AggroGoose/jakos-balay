"use client";

import { UserLoginLogout } from "./userLoginLogout";

export default function UserNav() {
  return (
    <div className="fixed top-6 right-6 z-50">
      <UserLoginLogout />
    </div>
  );
}
