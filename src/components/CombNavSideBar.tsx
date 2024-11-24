'use client';

import React from 'react';
import Sidebar from './SideBar'; 
import Navbar from './Navbar'; 

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            {/* Navbar di bagian atas */}
            <Navbar />

            {/* Sidebar dan Konten Utama */}
            <div className="flex flex-1">
                {/* Sidebar di kiri */}
                <Sidebar />

                {/* Konten Halaman */}
                <main className="flex-1 p-4 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
