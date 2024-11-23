'use client'

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/SideBar";
import "./layout.modules.css"
import {AuthProvider, useAuth} from "@/context/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
                                     children,
                                   }: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="en">
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <AuthProvider>
        {/* The entire layout is wrapped by AuthProvider */}
        <div className="layout">
          <Navbar />
          <div className="body">
            <AuthAwareSidebar />
            <div className="content">{children}</div>
          </div>
        </div>
      </AuthProvider>
      </body>
      </html>
  );
}

// Sidebar component controlled by authentication state
function AuthAwareSidebar() {
  const { isLoggedIn } = useAuth(); // This works now since AuthProvider is wrapping RootLayout
  return isLoggedIn ? <Sidebar /> : null;
}
