"use client";

import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
    const {data: session, status} = useSession;
    const isLoggedIn = status === "authenticated";

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
          placeholder="Type to search.."
          className={styles.searchInput}
          aria-label="Search"
        />
      </div>
      {/* Profile, Login, SignUp + Authentication */}
      <div>
        {isLoggedIn ? (
            // If the user is logged In
            <Image 
            src={session.user.image}
            alt={session.user.name}
            width={40}
            height={50}
            className={styles.profilePic}/>
        ) : ( 
            // If the user in not logged in or signed up
        <button onClick={() => signIn()}>
            Login / SignUp
        </button>)}
      </div>
    </nav>
  );
}
