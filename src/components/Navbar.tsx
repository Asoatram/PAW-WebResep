'use client';

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; // Correct useRouter hook

export default function Navbar() {
    const auth = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    const searchClick = () => {
        router.push(`/browse?recipe=${searchText}`);
    };

    return (
        <nav className="sticky" style={{ background: "#9CDBA6" }}>
            <div className="w-full">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="text-black md:flex text-2xl font-bold inline">
                        <Link href={"/home"}>
                            <img className={"mx-4"} src={"/food-svgrepo-com.png"} alt={"Logo"} height={50} width={50} />
                        </Link>
                        <span className={"self-center"}>Feastify</span>
                    </div>

                    {/* Search Bar */}
                    <div className={"flex items-center space-x-3"}>
                        <input
                            onChange={(event) => setSearchText(event.target.value)}
                            placeholder={"Search food"}
                            className={"border-2 focus:ring-blue-300 focus:border-blue-300 rounded-xl p-2.5 h-10"}
                        />
                        <button className={"rounded-xl py-2 px-3 hover:bg-green-500 bg-green-300"} onClick={searchClick}>
                            Search
                        </button>
                    </div>

                    {/* User Icon */}
                    <div className="flex items-center">
                        {auth.isLoggedIn ? (
                            <div className="flex items-center">
                                <span className="text-black mr-2">{auth.username}</span>
                                <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center">
                                    <span>User</span>
                                </div>
                            </div>
                        ) : (
                            <Link href="/" className="text-black py-2 bg-green-300 rounded-xl hover:bg-green-500 mr-32">Sign In</Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-black focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu (removed since there are no links) */}
                {isOpen && (
                    <div className="md:hidden w-full">
                        {/* No links to display */}
                    </div>
                )}
            </div>
        </nav>
    );
}
