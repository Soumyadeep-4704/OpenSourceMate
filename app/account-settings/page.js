"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation"; // Used to protect the route

export default function AccountSettingsPage() {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState('light');

  // Effect to set the initial theme from localStorage or system preference
  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  // Effect to apply the theme to the <html> tag and save to localStorage
  useEffect(() => {
    if (!isMounted) return; // Don't run until component is mounted
    
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [theme, isMounted]);

  // 1. Handle the loading state
  if (status === "loading" || !isMounted) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4 md:p-12 bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400 animate-pulse">Loading settings...</p>
      </main>
    );
  }

  // 2. Handle the unauthenticated state
  if (status === "unauthenticated") {
    redirect("/"); // Protect the route
  }

  // 3. Render the settings if authenticated
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-12 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-2xl">
        {/* Back Link */}
        <div className="mb-4">
          <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            &larr; Back to Dashboard
          </Link>
        </div>

        {/* Settings Card */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Account Settings
          </h1>

          {/* Theme Toggler Section */}
          <div className="space-y-4">
            {/* Other Dummy Settings */}
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md dark:bg-gray-700">
              <div>
                <h2 className="font-medium text-gray-900 dark:text-white">Email Notifications</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enable or disable email alerts.
                </p>
              </div>
              {/* A disabled toggle for show */}
              <button
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-not-allowed rounded-full border-2 border-transparent bg-gray-200 dark:bg-gray-600"
                role="switch"
                aria-checked="false"
                disabled
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 translate-x-0"
                />
              </button>
            </div>

            {/* Danger Zone */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
              <button 
              onClick={() => signOut()}
              className="text-sm font-medium text-red-600 bg-[#0ed7a8] dark:bg-teal-600 dark:text-gray-300 px-4 py-2 rounded-md hover:bg-[#0ed7a8] dark:hover:bg-teal-500 transition-colors">
                Logout
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}