'use client'

import React from 'react'
import Uploadform from './_components/Uploadform'

const Page = () => {
  return (
    <section className='h-screen bg-gradient-to-br  from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-900'>
    <div className=" p-5 px-8 md:px-28">
      <h2 className="text-[20px] text-center m-5">
        Start <strong className="text-blue-700">Uploading</strong> File and <strong className="text-blue-700">Share</strong> it
      </h2>
      <Uploadform />
    </div>
    </section>
  )
}

export default Page
