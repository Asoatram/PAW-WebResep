'use client';

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation"; // Correct useRouter hook
import { useEffect } from "react";
import LoginCard from "@/components/LoginCard";

export default function Home() {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            router.push("/home"); // Trigger navigation after rendering
        }
    }, [isLoggedIn, router]); // Dependency array ensures it runs when `isLoggedIn` changes

    // Render the login card if the user is not logged in
    if (!isLoggedIn) {
        return (
            <div>
                <div className="flex justify-center content-center m-4 mt-32">
                    <div>
                        <LoginCard />
                    </div>
                </div>
            </div>
        );
    }

    // While redirecting, return null or a loading indicator to avoid rendering anything
    return null;
}
