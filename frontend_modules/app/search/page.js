import Link from "next/link";
import IssueCard from "@/app/components/IssueCard";

export default async function SearchPage({ searchParams }) {
  // Await the searchParams to extract the query 'q'
  const { q } = await searchParams;
  const query = q || "";

  // Perform the search
  const results = searchIssues(query);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-12">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
            Search Results
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Showing results for <span className="font-semibold">"{query}"</span>
          </p>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-12 text-center border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No results found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              We couldn't find any issues matching "{query}". Try searching for a different keyword or ID.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}