// import { UserButton } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div>
      <button onClick={() => signOut({ redirectUrl: '/' })}>Sign out</button>
      <h1>files</h1>
    </div>
  )
}

export default page
