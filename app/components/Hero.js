"use client";

import { useSession } from "next-auth/react";

export default function Hero() {
  const { data: session, status } = useSession();

  //Handling the loading state while session is being fetched (in case the server is slow due to poor internet connection)
  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center p-4 md:p-12 bg-gray-50">
        <p className="text-gray-500 animate-pulse">Loading profile...</p>
      </main>
    );
  }

  // If the user is Logged In
  if (status === "authenticated") {
    let userName = session.user.name;

    return (
      <div className="flex min-h-full flex-col items-center justify-center p-24">
        <h1 className="text-5xl font-bold font-mono bg-gradient-to-r from-[#0ed7a8] to-[#417505] bg-clip-text text-transparent">
          Welcome, {userName}!{" "}
        </h1>
      </div>
    );
  }

  // If the user is not Logged In
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-5xl font-bold font-mono bg-gradient-to-r from-[#0ed7a8] to-[#417505] bg-clip-text text-transparent">
        Welcome, Guest!
      </h1>
      <p className="text-sm text-gray-500 dark:text-white font-bold font-mono">
        Login to get started. Use GitHub for the best experience, or sign in
        with the Google account linked to your GitHub.
      </p>
    </div>
  );
}
