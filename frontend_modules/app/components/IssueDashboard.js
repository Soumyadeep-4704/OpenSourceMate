"use client";

import { useState, useEffect } from "react";
import DashChart from "./DashChart";
import IssueCard from "./IssueCard";
import { useSession } from "next-auth/react";

export default function IssueDashboard() {
  const [showMore, setShowMore] = useState(false);
  const { data: session, status } = useSession();

  // State
  const [issues, setIssues] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // AI Integration State
  const [trendingIssues, setTrendingIssues] = useState([]);
  const [aiLoading, setAiLoading] = useState(true);

  // Fetch AI Recommendations (Running in parallel with GitHub data)
  useEffect(() => {
    async function fetchAiTrending() {
      try {
        // Fetch from our Python AI Backend
        // Uses environment variable for production, fallback to localhost for dev
        let apiUrl = process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000";
        
        // Remove trailing slash if present to avoid double slashes in URL
        if (apiUrl.endsWith('/')) {
            apiUrl = apiUrl.slice(0, -1);
        }

        // console.log("Fetching AI recommendations from:", apiUrl);  //Added for debugging

        const res = await fetch(`${apiUrl}/api/recommendations/trending?language=javascript`);
        
        if (res.ok) {
          const data = await res.json();
          // Transform AI data to match IssueCard format
          const formattedTrending = data.issues.map((issue) => {
            // Construct ID compatible with our [id] page: owner__repo__number
            const [owner, name] = issue.repo.split("/");
            const number = issue.url.split("/").pop(); 
            
            return {
              id: `${owner}__${name}__${number}`,
              title: issue.title, 
              description: `🔥 Trending in ${issue.repo} with ${issue.comments} comments and ${issue.reactions} reactions.`,
              tags: [], 
              displayId: `#${number}`,
              updatedAt: new Date().toISOString(), // Timestamp not in simple AI response, defaulting to now
            };
          });
          setTrendingIssues(formattedTrending);
        } else {
             console.error("AI Backend returned error:", res.status);
        }
      } catch (error) {
        console.error("AI Service unavailable:", error);
      } finally {
        setAiLoading(false);
      }
    }

    fetchAiTrending();
  }, []);

  useEffect(() => {
    async function fetchGitHubIssues() {
      if (status === "authenticated" && session?.accessToken) {
        try {
          // Simplified query syntax.
          // The search API treats space-separated terms as AND by default.
          // To do OR, we must be explicit. However, GitHub sometimes rejects complex ORs.
          // Our query that asks for "is:open is:issue" AND one of the user qualifiers.
          // USing OR operator properly and the Github API searches for all thhe issues that is opened by the user, mentions user, or assigned to user.

          const query = encodeURIComponent("is:issue is:open involves:@me");

          const res = await fetch(
            `https://api.github.com/search/issues?q=${query}&sort=updated&per_page=100`,
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
                Accept: "application/vnd.github.v3+json",
              },
            }
          );

          if (res.ok) {
            const data = await res.json();
            const issuesData = data.items || []; // Ensure items is an array

            // Process Issues List
            const formattedIssues = issuesData.map((issue) => {
              // Added Safe parsing of repository URL
              let repoOwner = "unknown";
              let repoName = "unknown";

              if (issue.repository_url) {
                const parts = issue.repository_url.split("/");
                repoOwner = parts[parts.length - 2];
                repoName = parts[parts.length - 1];
              }

              return {
                id: `${repoOwner}__${repoName}__${issue.number}`,
                title: issue.title,
                status: issue.state === "open" ? "In Progress" : "Closed",
                description: issue.body,
                tags: issue.labels ? issue.labels.map((l) => l.name) : [],
                displayId: `#${issue.number}`,
                updatedAt: issue.updated_at,
              };
            });
            setIssues(formattedIssues);

            // Process Chart Data (Last 7 Days Activity)
            const last7Days = [...Array(7)]
              .map((_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - i);
                return d.toISOString().split("T")[0]; // YYYY-MM-DD
              })
              .reverse();

            const activityData = last7Days.map((date) => {
              const count = issuesData.filter(
                (issue) => issue.updated_at && issue.updated_at.startsWith(date)
              ).length;

              const dayName = new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
              });
              return { name: dayName, value: count };
            });

            setChartData(activityData);
          } else {
            // Handle errors without crashing
            console.warn("GitHub API returned status:", res.status);
            // Only log error if it's strictly an error, 422 might just be "invalid query"
            if (res.status !== 422) {
              console.error("GitHub API Error Details:", await res.text());
            }
            setIssues([]);
          }
        } catch (error) {
          console.error("Failed to fetch issues:", error);
          setIssues([]);
        } finally {
          setLoading(false);
        }
      } else if (status === "unauthenticated") {
        setLoading(false);
      }
    }

    fetchGitHubIssues();
  }, [status, session]);

  if (status === "loading" || (status === "authenticated" && loading)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-gray-500 animate-pulse">Loading GitHub data...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  const currentIssue = issues[0];
  const recentIssues = issues.slice(1);
  const displayedIssues = showMore ? recentIssues : recentIssues.slice(0, 4);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column: Current Issue */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          {currentIssue ? (
            <>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 dark:text-gray-400">
                Latest Task
              </h2>
              <h1 className="text-2xl font-bold text-gray-900 mb-3 dark:text-white">
                {currentIssue.title}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {currentIssue.tags &&
                  currentIssue.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              <p className="text-gray-600 leading-relaxed dark:text-gray-300 line-clamp-3">
                {currentIssue.description || "No description provided."}
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                No open issues found!
              </p>
              <p className="text-sm text-gray-400 mt-2 text-center max-w-md">
                Issues created by you, assigned to you, or mentioning you will
                appear here automatically.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Real-time Charts */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 dark:text-gray-400">
            Activity (Last 7 Days)
          </h2>

          {/* Chart Component Usage */}
          <DashChart data={chartData} />

          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md dark:bg-gray-700">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Total Issues Fetched
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {issues.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 dark:text-white">
          Recent Issues
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayedIssues.length > 0 ? (
            displayedIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 italic">
                No other recent issues found.
              </p>
            </div>
          )}
        </div>

        {recentIssues.length > 4 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
      
      {/* AI RECOMMENDATIONS SECTION */}
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            AI Recommended for You
            </h2>
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                Trending
            </span>
        </div>

        {aiLoading ? (
             <div className="flex py-8 items-center justify-center text-gray-400 animate-pulse">
                Fetching AI insights...
             </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingIssues.length > 0 ? (
                trendingIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
                ))
            ) : (
                <div className="col-span-full text-center py-8">
                <p className="text-gray-500 italic">
                    AI could not find recommendations at this time.
                </p>
                </div>
            )}
            </div>
        )}
      </div>
    </div>
  );
}