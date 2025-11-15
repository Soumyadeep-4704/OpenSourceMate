"use client";

import { useSession } from "next-auth/react";

export default function Hero() {
    const {data: session, status} = useSession();

    // If the user is Logged In
    if(status === "authenticated"){
        let userName = session.user.name;

        return (
        <div>
            <h1>Welcome, {userName}! </h1>
        </div>
    );
    }

    // If the user is not Logged In
    return (
        <div>
            <h1>Welcome, Guest!</h1>
            <p>Please login to start</p>
        </div>
    );
}