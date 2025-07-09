"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Image from 'next/image';
import logo from '@/public/logo.png';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Upload', href: '/upload' },
    { label: 'Files', href: '/files' },
    { label: 'Contact-us', href: '/contact-us' },
  ];

  return (
    <>
      <nav className="border-b border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
           <div className="flex-1 flex items-center gap-3">
  <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="md:hidden text-gray-700 dark:text-white focus:outline-none"
  >
    {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
  </button>

  <Link href="/" className="block ml-auto md:ml-0">
    <div className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden">
      <Image
        src={logo}
        alt="Logo"
        className="h-full w-full object-contain fill-white"
      />
    </div>
  </Link>
          </div>


            {/* Desktop Nav */}
            <div className="hidden md:flex md:items-center md:gap-12">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  {navItems.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-gray-500 transition hover:text-gray-700 dark:text-white dark:hover:text-white/75"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

        
              <div className="flex items-center gap-4 ml-4">
                <SignedIn>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: { avatarBox: "w-8 h-8" },
                    }}
                  />
                </SignedIn>

                <SignedOut>
                  <button className="rounded-md bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 transition">
                    <Link href="/sign-in">Login</Link>
                  </button>
                </SignedOut>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 z-50 shadow-lg p-6 transition-all">
          <nav className="flex flex-col gap-4 mt-8">
            {navItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className="text-gray-700 dark:text-white text-base font-medium hover:underline"
              >
                {label}
              </Link>
            ))}

            <div className="mt-6">
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: { avatarBox: "w-8 h-8" },
                  }}
                />
              </SignedIn>

              <SignedOut>
                <Link
                  href="/sign-in"
                  onClick={() => setSidebarOpen(false)}
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Login
                </Link>
              </SignedOut>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
