'use client'


import React, { useState } from 'react';

export default function Navbar(){

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky" style={{background: "#9CDBA6"}}>
            <div className="w-full">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="text-white md:flex text-2xl font-bold inline">
                        <a href="#">
                            <img className={"mx-4"} src={"/food-svgrepo-com.png"} alt={"Logo"} height={50} width={50} />
                        </a>
                        <text className={"self-center"}> Feastify</text>
                    </div>

                    <div className={"space-x-3 justify-center "}>
                        <input placeholder={"Search for Recipe"} className={"border-2 focus:ring-blue-300 focus:border-blue-300 rounded-xl p-2.5 h-1/2 align-middle"}></input>
                        <button className={"rounded-xl py-2 px-3 hover:bg-green-500 bg-green-300"}> Search</button>
                    </div>

                    {/* Menu links */}
                    <div className="hidden md:flex space-x-4 h-full justify-center">
                        <a href="#" className="text-white px-4 pt-5 block w-full hover:bg-teal-900">Home</a>
                        <a href="#" className="text-white px-4 pt-5 block w-full hover:bg-teal-900">About</a>
                        <a href="#" className="text-white px-4 pt-5 block w-full hover:bg-teal-900">Services</a>
                        <a href="#" className="text-white px-4 pt-5 block w-full hover:bg-teal-900">Contact</a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white focus:outline-none"
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

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden w-full">
                        <a href="#" className="flex px-2 text-white py-2 hover:bg-teal-900">Home</a>
                        <a href="#" className="flex px-2 text-white py-2 hover:bg-teal-900">About</a>
                        <a href="#" className="flex px-2 text-white py-2 hover:bg-teal-900">Services</a>
                        <a href="#" className="flex px-2 text-white py-2 hover:bg-teal-900">Contact</a>
                    </div>
                )}
            </div>
        </nav>
    );


}