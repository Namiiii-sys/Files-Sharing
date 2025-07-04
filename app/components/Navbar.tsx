import React from 'react';
import Link from 'next/link';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

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
              

<div className="flex items-center gap-4">
  
  <SignedIn>
    <UserButton 
      afterSignOutUrl="/" 
      appearance={{
        elements: {
          avatarBox: "w-8 h-8", 
        }
      }}
    />
  </SignedIn>

  <SignedOut>
    <div>
      <button className="rounded-md bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 transition">
        <Link href="/sign-in" >Login</Link>
      </button>
    </div>
  </SignedOut>
</div>

            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
