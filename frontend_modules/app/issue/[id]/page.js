import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function IssueDetail({params}) {
  // Get ID from URL
  const { id } = await params; 
  
  // Get User Session (needed for API access)
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/"); // Redirect if not logged in
  }

  // Parse the ID: owner__repo__number
  const [owner, repo, number] = id.split("__");

  if (!owner || !repo || !number) {
    return (
        <div className="flex min-h-screen items-center justify-center text-red-500">
            Invalid Issue ID format.
        </div>
    );
  }

  // Fetch from GitHub API
  let issue = null;
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${number}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
      // Revalidate cache every 60 seconds
      next: { revalidate: 60 } 
    });

    if (res.ok) {
      issue = await res.json();
    } else {
      console.error("GitHub API Error:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }

  if (!issue) {
    notFound();
  }

  // Determine Status Color
  const statusColor = 
    issue.state === 'closed' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
    issue.state === 'open' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-12">
      <div className="w-full max-w-6xl">
        {/* Header Section */}
        <div className="mb-8">
          <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            &larr; Back to Dashboard
          </Link>
          <div className="flex justify-between items-center mt-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{issue.title}</h1>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${statusColor}`}>
              {issue.state}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-500 mt-1 dark:text-gray-400">
            {owner}/{repo} • #{number}
          </span>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 dark:text-white">Description</h2>
              <div className="text-gray-600 leading-relaxed dark:text-gray-300 whitespace-pre-wrap font-sans overflow-hidden break-words">
                {issue.body || "No description provided."}
              </div>
            </div>
            
            {/* Action Button */}
            <div className="text-center">
                <a 
                    href={issue.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                    View on GitHub &rarr;
                </a>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 dark:text-white">Details</h2>
              <ul className="space-y-4">
                {/* Assignee */}
                <li className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Assignee:</span>
                  <div className="flex items-center gap-2">
                    {issue.assignee ? (
                        <>
                            <img src={issue.assignee.avatar_url} alt="Avatar" className="w-6 h-6 rounded-full" />
                            <span className="font-medium text-gray-900 dark:text-white text-sm">{issue.assignee.login}</span>
                        </>
                    ) : (
                        <span className="text-gray-500 italic text-sm">Unassigned</span>
                    )}
                  </div>
                </li>
                
                {/* Reporter */}
                <li className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Reporter:</span>
                  <div className="flex items-center gap-2">
                     <img src={issue.user.avatar_url} alt="Avatar" className="w-6 h-6 rounded-full" />
                     <span className="font-medium text-gray-900 dark:text-white text-sm">{issue.user.login}</span>
                  </div>
                </li>

                {/* Labels */}
                <li className="flex flex-col gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Labels:</span>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {issue.labels.length > 0 ? (
                        issue.labels.map(label => (
                            <span 
                                key={label.id}
                                className="text-xs font-medium px-2.5 py-1 rounded-full"
                                style={{ 
                                    backgroundColor: `#${label.color}33`, 
                                    color: `#${label.color}`,
                                    border: `1px solid #${label.color}` 
                                }}
                            >
                            {label.name}
                            </span>
                        ))
                    ) : (
                        <span className="text-sm text-gray-400 italic">No labels</span>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
