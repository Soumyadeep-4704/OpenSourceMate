"use client";

// We need state for the "Show More" toggler
import { useState } from "react";
import { currentIssue, recentIssues } from "@/app/lib/mock-data";
import DashChart from "./DashChart";
import IssueCard from "./IssueCard";
import { useSession } from "next-auth/react";

export default function IssueDashboard() {
  // State for the "Show More" toggler
  const [showMore, setShowMore] = useState(false);
  const {data: session, status} = useSession();

  // Logic to determine which issues to display
  const displayedIssues = showMore ? recentIssues : recentIssues.slice(0, 4);


  if (status === "authenticated") {         //Shows the content only if the user is Logged In
    return (
      <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
        {/* 1. TOP SECTION (Current Issue + Charts) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column: Current Issue */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 dark:text-gray-300">
              Current Task
            </h2>
            <h1 className="text-2xl font-bold text-gray-900 mb-3 dark:text-white">
              {currentIssue.title}
            </h1>
            <div className="flex gap-2 mb-4">
              {currentIssue.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-600 leading-relaxed dark:text-gray-300">
              {currentIssue.description}
            </p>
          </div>

          {/* Right Column: Charts & Stats */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-400">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 dark:text-white">
              Activity
            </h2>
            <DashChart />
            {/* Simple Stat Cards */}
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md rounded-md dark:bg-gray-700">
                <span className="text-sm font-medium text-gray-600 dark:text-white">
                  Issues Closed (Week)
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">5</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md dark:bg-gray-700">
                <span className="text-sm font-medium text-gray-600 dark:text-white">
                  PRs Merged
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">3</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md dark:bg-gray-700">
                <span className="text-sm font-medium text-gray-600 dark:text-white">
                  PRs in Progress
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">2</span>
              </div>
            </div>
          </div>
        </div>

        {/*  BOTTOM SECTION (Recent Issues) */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 dark:text-white">
            Recent Issues
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>

          {/* "SHOW MORE" TOGGLER */}
          <div className="text-center mt-6">
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      </div>
    );
  }

}