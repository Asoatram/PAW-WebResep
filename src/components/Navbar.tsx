'use client';

import React, {useEffect, useState} from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; // Correct useRouter hook

export default function Navbar() {
    const auth = useAuth();
    const router = useRouter();
    const [data, setData] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState<string>('');



    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        const response = await fetch('/api/recipes');
        const data = await response.json();
        setData(data);
    };



    const searchClick = () => {
        router.push(`/browse?recipe=${searchText}`);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            searchClick(); // Trigger search when Enter is pressed
        }
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
                            onChange={onChange}
                            value={searchText}
                            onKeyDown={handleKeyDown} // Add Enter key handling
                            placeholder={"Search food"}
                            className={"border-2 focus:ring-blue-300 focus:border-blue-300 rounded-xl p-2.5 h-10"}
                        />
                        <button className={"rounded-xl py-2 px-3 hover:bg-green-500 bg-green-300"} onClick={searchClick}>
                            Search
                        </button>
                        {/* Dropdown */}
                        {searchText && (
                            <div className="absolute top-full left-100 mt-1 w-80 bg-white border-2 border-gray-300 rounded-xl shadow-md z-10">
                                {data
                                    .filter((item) => item.title.toLowerCase().startsWith(searchText.toLowerCase())&& item.title.toLowerCase() !== searchText.toLowerCase())
                                    .map((item) => (
                                        <div
                                            key={item.title} // Use id if available, otherwise use title as fallback
                                            className="p-2 cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                setSearchText(item.title);
                                                router.push(`/browse?recipe=${item.title}`)
                                            }}
                                        >
                                            {item.title.length > 30 ? `${item.title.substring(0, 30)}...` : item.title}
                                        </div>
                                    ))}
                            </div>
                        )}
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
