import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
// Uses relative import instead of alias '@'
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Link from "next/link";
// Uses relative import instead of alias '@'
import IssueCard from "../../components/IssueCard";

export default async function IssueDetail({ params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  // Await params for Next.js compatibility
  const { id } = params;

  // The Dashboard constructs IDs like "owner__repo__number"
  const parts = id.split("__");
  
  // Basic validation
  if (parts.length !== 3) {
    return (
        <div className="flex h-screen items-center justify-center">
            <p className="text-red-500">Invalid Issue ID format.</p>
        </div>
    );
  }

  const [owner, repo, number] = parts;

  // Fetch individual issue details from GitHub
  let issue = null;
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${number}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (res.ok) {
      const data = await res.json();
      issue = {
        id: id,
        title: data.title,
        status: data.state === "open" ? "In Progress" : "Closed",
        description: data.body,
        tags: data.labels ? data.labels.map((l) => l.name) : [],
        displayId: `#${data.number}`,
        updatedAt: data.updated_at,
        html_url: data.html_url,
        user: data.user,
      };
    } else {
        console.error("GitHub Error:", res.status, await res.text());
    }
  } catch (error) {
    console.error("Failed to fetch issue details:", error);
  }

  if (!issue) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">Issue not found.</p>
        <Link href="/" className="text-blue-600 hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      <div className="mb-6">
        <Link 
            href="/" 
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{owner} / {repo}</span>
                        <span className="text-sm text-gray-300 dark:text-gray-600">•</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{issue.displayId}</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                        {issue.title}
                    </h1>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                    issue.status === "In Progress"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800"
                    : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                }`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${issue.status === "In Progress" ? "bg-green-500" : "bg-purple-500"}`}></span>
                    {issue.status}
                </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
                {issue.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-300">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="prose prose-blue max-w-none dark:prose-invert">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-900/50 dark:border-gray-700/50">
                    <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-700 dark:text-gray-300">
                        {issue.description || "No description provided."}
                    </p>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                <a 
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 dark:focus:ring-gray-700 transition-colors"
                >
                    View on GitHub
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
            </div>
        </div>
      </div>
    </div>
  );
}
