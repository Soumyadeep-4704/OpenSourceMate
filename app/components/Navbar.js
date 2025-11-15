"use client";

import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  // Authentication
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  // Dropdown Menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Checking whether the user is inside or outside the dropdown
  const dropdownRef = useRef(null);

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
      <div>
        <input
          type="text"
          name="search"
          placeholder="Type to search..."
          className={styles.searchInput}
          aria-label="Search"
        />
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
          <button onClick={() => signIn()} className={styles.login}>Login</button>
        )}
      </div>
    </nav>
  );
}
