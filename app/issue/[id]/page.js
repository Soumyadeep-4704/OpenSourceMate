import { findIssueById } from "@/app/lib/mock-data";
import Link from "next/link";
import { notFound } from "next/navigation";


export default async function IssueDetail({params}) {
  const { id } = params; 

  // Find the issue data using the helper function
  const issue = findIssueById(id);

  // If no issue is found, show a 404 page
  if (!issue) {
    notFound();
  }

  // --- Mock data for the detail page ---
  const commitHistory = [
    { sha: "a1b2c3d", message: "Feat: Initial setup for issue page", author: "You" },
    { sha: "e4f5g6h", message: "Refactor: Clean up styling", author: "You" },
    { sha: "i7j8k9l", message: "Fix: Typo in variable name", author: "You" },
  ];
  // ------------------------------------

  const statusColor = 
    issue.status === 'Closed' ? 'bg-green-100 text-green-800' :
    issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
    'bg-gray-100 text-gray-800';

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-12">
      <div className="w-full max-w-6xl">
        {/* Header Section */}
        <div className="mb-8">
          <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-800">
            &larr; Back to Dashboard
          </Link>
          <div className="flex justify-between items-center mt-2">
            <h1 className="text-3xl font-bold text-gray-900">{issue.title}</h1>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${statusColor}`}>
              {issue.status || 'Open'}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-500 mt-1">
            Issue ID: #{issue.id.toUpperCase()}
          </span>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Description & Commits */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {issue.description || "No description provided for this issue."}
              </p>
            </div>

            {/* Commit History */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Commits</h2>
              <ul className="space-y-4">
                {commitHistory.map(commit => (
                  <li key={commit.sha} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <p className="font-medium text-gray-800">{commit.message}</p>
                    <span className="text-sm text-gray-500 font-mono">
                      {commit.sha} by {commit.author}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Stats & People */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Details</h2>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600">Assignee:</span>
                  <span className="font-medium text-gray-900">You</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Reporter:</span>
                  <span className="font-medium text-gray-900">Jane Doe</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Labels:</span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      bug
                    </span>
                    <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      v2.0
                    </span>
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