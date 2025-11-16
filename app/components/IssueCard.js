import Link from 'next/link';

// This is a small, reusable component for the grid.
// It takes an 'issue' object as a prop.
export default function IssueCard({ issue }) {
  const statusColor = 
    issue.status === 'Closed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
    issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';

  return (
    <Link href={`/issue/${issue.id}`} className="block p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-lg-dark">
      <h3 className="font-semibold text-gray-900 truncate dark:text-white">{issue.title}</h3>
      <div className="flex justify-between items-center mt-3">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">#{issue.id.toUpperCase()}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor}`}>
          {issue.status}
        </span>
      </div>
    </Link>
  );
}