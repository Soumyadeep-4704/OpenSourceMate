export const currentIssue = {
  id: "osm-123",
  title: "Refactor Authentication Flow",
  description: "The current authentication flow in `Navbar.js` and `AuthProvider.js` is functional but could be optimized. We need to refactor the `useSession` calls to handle loading states more gracefully and reduce layout shift. This involves centralizing the session check, potentially in a higher-order component or a custom hook, to avoid redundant `status === 'loading'` checks in every component.",
  tags: ["auth", "refactor", "performance"]
};

export const recentIssues = [
  { id: "osm-122", title: "Fix: Google Client ID Typo", status: "Closed" },
  { id: "osm-121", title: "Feat: Add Tailwind CSS", status: "Closed" },
  { id: "osm-120", title: "Feat: Implement Profile Dropdown", status: "Closed" },
  { id: "osm-119", title: "Bug: Navbar `useSate` typo", status: "Closed" },
  { id: "osm-118", title: "Feat: Add Hero Section Gradient", status: "In Progress" },
  { id: "osm-117", title: "Docs: Update README", status: "Open" },
  { id: "osm-116", title: "Chore: Configure `.env.local`", status: "Closed" },
  { id: "osm-115", title: "Bug: 404 on Google Redirect", status: "Closed" },
];

export const chartData = [
  { name: "Mon", commits: 4 },
  { name: "Tue", commits: 2 },
  { name: "Wed", commits: 8 },
  { name: "Thu", commits: 5 },
  { name: "Fri", commits: 1 },
  { name: "Sat", commits: 0 },
  { name: "Sun", commits: 3 },
];

// This function will find an issue from *any* of our mock data lists
export function findIssueById(id) {
  // Combining all issues into one list to search
  const allIssues = [currentIssue, ...recentIssues];
  
  // Finds the issue that matches the id
  return allIssues.find(issue => issue.id === id);
}