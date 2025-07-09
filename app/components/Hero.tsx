import React from 'react';
import Constants from '../_utils/Constant';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-900 min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl dark:text-white leading-tight">
          <span className="text-blue-800">Upload, Save</span> and Easily <span className="text-blue-800">Share your files</span><br />
          In one place
        </h1>

        <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 sm:text-xl">
          {Constants.desc}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/upload"
            className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-white font-semibold shadow-md hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </a>

          <a
            href="#"
            className="inline-block rounded-md border border-gray-300 dark:border-gray-700 px-6 py-3 font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
