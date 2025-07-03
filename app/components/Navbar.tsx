import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a href="#" className="block">
              <div className="h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-full w-full object-contain"
                />
              </div>
            </a>
          </div>

         
          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                {['Home', 'Upload', 'About', 'Contact-us'].map((item) => (
                  <li key={item}>
                    <a
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="text-gray-500 transition hover:text-gray-700 dark:text-white dark:hover:text-white/75"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <Link
                  href="/sign-in"
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium dark:bg-gray-800 dark:text-white dark:hover:text-white/75 hover:bg-blue-800 hover:text-white"
                >
                  Login
                </Link>
                <div className="hidden sm:flex">
                  <Link
                    href="/sign-up"
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium dark:bg-gray-800 dark:text-white dark:hover:text-white/75 hover:bg-blue-800 hover:text-white"
                  >
                    Register
                  </Link>
                </div>
              </div>

              <div className="block md:hidden">
                <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-800 dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
