"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation"; // Used to protect the route

export default function ProfilePage() {
  const { data: session, status } = useSession();

  //Handles the loading state while session is being fetched
  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center p-4 md:p-12 bg-gray-50">
        <p className="text-gray-500 animate-pulse">Loading profile...</p>
      </main>
    );
  }

  //Handles the unauthenticated state and redirects to home page if not logged in
  if (status === "unauthenticated") {
    redirect("/");
  }

  //Renders the profile if authenticated
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-12 bg-gray-50 dark:bg-gray-800">
      <div className="w-full max-w-2xl">
        {/* Back Link */}
        <div className="mb-4">
          <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors dark:text-blue-400 dark:hover:text-blue-300">
            &larr; Back to Dashboard
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-5">
            {/* Profile Image */}
            <Image
              src={session.user.image}
              alt={session.user.name || "Profile Picture"}
              width={80} // 80px
              height={80} // 80px
              className="rounded-full border-2 border-gray-200 mb-4 sm:mb-0 dark:border-gray-700"
              priority // Load the profile image faster
            />
            
            {/* Profile Info */}
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {session.user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {session.user.email || "No email provided."}
              </p>
            </div>
          </div>

          {/* Profile Content*/}
          <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 dark:text-white">User Details</h2>
            <ul className="space-y-3">
              <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md dark:bg-gray-800">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Account Status:</span>
                <span className="text-sm font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Active</span>
              </li>
              <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md dark:bg-gray-800">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Joined:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">November 2025</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}