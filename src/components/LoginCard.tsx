'use client'

import React, {useState} from "react";
import {useAuth } from "@/context/AuthContext"
import Link from "next/link";
import { useRouter } from "next/navigation";
import user from "@/models/User"; // Correct useRouter hook

export default function LoginCard() {
    const { login, isLoggedIn, logout } = useAuth(); // Access the setLoggedIn function from AuthContext
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate API call for login
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            console.log(data);
            // Assuming the server returns a JWT token
            if (data.accessToken != null) {
                console.log(data.user.username)
                login(data.user.username)
                router.push('/home')
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="flex w-full max-w-2xl overflow-hidden rounded-lg shadow-md">
            {/* Left Section */}
            <div className="w-1/2 bg-green-200 p-6 flex flex-col items-center justify-center">
                <img
                    src="/food-svgrepo-com.png" // Replace with your logo path
                    alt="Feastify Logo"
                    className="w-20 h-20 mb-4"
                />
                <h2 className="text-xl font-bold text-green-800">Feastify</h2>
                <p className="text-center text-green-700 mt-2">
                    Explore Flavors, One Recipe at a Time
                </p>
            </div>

            {/* Right Section */}
            <div className="w-1/2 bg-white p-6 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-gray-800">Welcome Back!</h3>
                <p className="text-sm text-gray-600">
                    Don&#39;t Have an account?{" "}
                    <Link href="/signup" className="text-green-500 hover:underline">
                        Sign Up
                    </Link>
                </p>

                <form className="mt-4" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-300"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-300"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                        <button type="submit" className="w-full py-2 mt-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring focus:ring-green-300">
                            Login
                        </button>

                </form>
            </div>
        </div>
    );
}
