import Link from "next/link";
import IssueCard from "../components/IssueCard";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function SearchPage({ searchParams }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  // Handle params being a promise in Next.js 15+ or object in 14
  // We await it just in case, or treat it as object if not async
  const params = await searchParams;
  const query = params?.q || "";

  if (!query) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <p className="text-gray-500">Please enter a search term.</p>
      </div>
    );
  }

  let issues = [];

  try {
    // Construct GitHub search query
    // We append the user's query to our base filters
    const githubQuery = encodeURIComponent(`${query} is:issue is:open`);
    
    const res = await fetch(
      `https://api.github.com/search/issues?q=${githubQuery}&per_page=20`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      issues = (data.items || []).map(issue => {
        // Parse repo info for ID
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
    }
  } catch (error) {
    console.error("Search failed:", error);
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Search Results for "{query}"
        </h1>
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {issues.length > 0 ? (
          issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed border-gray-300 dark:bg-gray-800 dark:border-gray-700">
            <p className="text-gray-500 text-lg">No issues found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
