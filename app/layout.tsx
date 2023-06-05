import AuthProvider from "./AuthProvider";
import "./globals.css";
import SideNav from "./Nav/sideNav";
import UserNav from "./Nav/userNav";
import { Mulish } from "next/font/google";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata = {
  title: "Jako's Balay",
  description: "A house for all of us",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={mulish.className + "  maingrid"}>
          <SideNav className="sidenav " />
          <main className="contentmain">
            <UserNav />
            {children}
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
