"use client";

import React, { useState } from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";

export default function SignupCard() {
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const router = useRouter();
        const { login, isLoggedIn, logout } = useAuth(); // Access the setLoggedIn function from AuthContext


    const handleSignup = async (e: React.FormEvent) => {
            e.preventDefault();

            // Simulate API call for signup
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

        try {
            // Send signup data
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: username ,email: email, password: password }),
            });
            const data = await response.json();

            if (!response.ok) throw new Error("Signup failed");

            // Send email verification
            const emailResponse = await fetch("/api/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id: data.user._id,email: data.user.email, name: data.user.username }),
            });
            if (!emailResponse.ok) throw new Error("Failed to send email");

                console.log("Signup successful:", data);
                if (data.accessToken != null) {
                    login()
                    router.push('/home')
                }
            } catch (error) {
                console.error("Signup error:", error);
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
                    <h3 className="text-xl font-bold text-gray-800">Don’t have an account?</h3>
                    <p className="text-sm text-gray-600">
                        Already Have an account?{" "}
                        <Link href=".." className="text-green-500 hover:underline">
                            Sign In
                        </Link>
                    </p>

                    <form className="mt-4" onSubmit={handleSignup}>
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-300"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

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

                        <div className="mb-4">
                            <label
                                htmlFor="confirm-password"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                className="w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-300"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 mt-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring focus:ring-green-300"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        );
    }
