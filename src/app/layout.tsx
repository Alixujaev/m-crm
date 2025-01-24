"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./(components)/Sidebar";
import Navbar from "./(components)/Navbar";
import { Toaster } from "react-hot-toast";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <ProgressBar
            height="4px"
            color="#1AC47D"
            options={{ showSpinner: false }}
            shallowRouting
          />
          <div className="flex">
            <div className="min-w-[280px] bg-red-500">
              <Sidebar />
            </div>
            <div
              className="flex-1 min-h-screen"
              style={{ width: `calc(100% - 230px)` }}
            >
              <Navbar />
              <div className="py-5 px-6">{children}</div>
            </div>
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
