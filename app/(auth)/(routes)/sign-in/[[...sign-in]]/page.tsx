import { SignIn } from '@clerk/nextjs';
import React from 'react';
import Image from 'next/image';
import visual from '@/public/visual.svg';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-900">
      
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <div className="relative flex items-center justify-center h-full w-full">
          <div className="relative z-10 flex flex-col items-center justify-center">
            <Image
              width={120}
              height={120}
              src={visual}
              alt="Login Visual"
              className="h-120 w-120 object-contain"
            />
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl -z-10 dark:bg-blue-700/20"></div>
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl -z-10 dark:bg-indigo-700/20"></div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md relative z-10">
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none bg-transparent w-full",
                headerTitle: "text-xl font-bold text-gray-800 dark:text-white",
                headerSubtitle: "text-gray-500 dark:text-gray-400",
                socialButtons: "gap-3",
                formFieldInput:
                  "dark:bg-gray-700/50 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500",
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm",
                footerActionText: "text-gray-600 dark:text-gray-300",
                footerActionLink:
                  "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
