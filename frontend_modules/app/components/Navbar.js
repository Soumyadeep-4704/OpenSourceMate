"use client";

import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  // Authentication
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  // Initiate Router
  const router = useRouter();

  // Dropdown Menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Checking whether the user is inside or outside the dropdown
  const dropdownRef = useRef(null);
  // Checking whether the user is inside or outside the searchbar
  const searchRef = useRef(null);

  // Search Handler
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  // Input Change Handler - Generates "AI" Suggestions
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      // Simulate AI finding relevant issues
      const results = searchIssues(query);
      setSuggestions(results);
      setIsSearchOpen(true);
    } else {
      setSuggestions([]);
      setIsSearchOpen(false);
    }
  };

  // Effect handler to handle the click event
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // To close the dropdown
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className={styles.navbarItems}>

      {/* Logo */}
      <div>
        <Link href="/">
          <Image src="/api.svg" alt="Logo" width={40} height={50}></Image>
        </Link>
      </div>

      {/* Search bar */}
      <div 
        className="flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative"
        ref={searchRef}
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
         
        <input
          type="text"
          name="search"
          placeholder="Type to search..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
          onKeyDown={handleSearch} // Listen for Enter key
          className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors"
          aria-label="Search"
          autoComplete="off"
        />

        {isSearchOpen && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">

                {/* Suggestions List */}
                <ul className="py-1">
                    {/* Generic Search Option */}
                    <li className="block">
                         <button 
                            onClick={() => {
                                router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                                setIsSearchOpen(false);
                                setSearchQuery("");
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                         >
                            <span className="text-gray-400">🔍</span>
                            <span>Search for <span className="font-semibold">"{searchQuery}"</span></span>
                         </button>
                    </li>

                    {/* Dynamic Matches */}
                    {suggestions.length > 0 ? (
                        suggestions.map((issue) => (
                            <li key={issue.id}>
                                <Link 
                                    href={`/issue/${issue.id}`}
                                    onClick={() => {
                                        setIsSearchOpen(false);
                                        setSearchQuery("");
                                    }}
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium truncate mr-2">{issue.title}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-600 group-hover:bg-white dark:group-hover:bg-gray-600 transition-colors">
                                            #{issue.id}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                                        {/* Added fallback to prevent crash if description is undefined */}
                                        {(issue.description || "No description available").substring(0, 50)}...
                                    </p>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center italic">
                            No direct matches found.
                        </li>
                    )}
                </ul>
            </div>
        )}
      </div>

      {/* Profile + Authetication */}
      <div>
        {isLoggedIn ? (
          // If the user is logged in
          <div className={styles.profileWrapper} ref={dropdownRef}>
            <Image
              src={session.user.image}
              alt={session.user.name || "Profile Picture"}
              width={40}
              height={40}
              className={styles.profilePic}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />

            {/* Profile Wrapper */}
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link href="/profile" onClick={() => setIsDropdownOpen(false)}>
                  View Profile
                </Link>
                <Link
                  href="/account-settings"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Account Settings
                </Link>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    signOut();
                  }}
                  className={styles.logoutButton}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // If user is not logged in
          <button onClick={() => signIn()} className={styles.login}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}