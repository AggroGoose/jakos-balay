import AuthProvider from "./AuthProvider";
import "@/lib/styles/globals.scss";
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
        <body className={mulish.className + "  main"}>
          <SideNav className="main-nav" />
          <main className="main-content">
            <UserNav />
            {children}
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
