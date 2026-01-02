export default function Footer() {
  return (
    <footer className="px-3 py-1 font-mono font-semibold text-sm text-gray-500 dark:text-gray-300">
      © {new Date().getFullYear()} OpenSource Mate. All rights reserved.
    </footer>
  );
}
