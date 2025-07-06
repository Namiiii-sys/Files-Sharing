'use client'

import React from 'react'
import Uploadform from './_components/Uploadform'
import { getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from '@/firebaseConfig'

const Page = () => {
  const upload = async (file: File) => {
    console.log("File received in parent:", file)
    const metadata = {
      contentType: file.type
    }

    const storage = getStorage(app)
    const storageRef = ref(storage, 'file-upload/' + file.name)


    const uploadTask = uploadBytesResumable(storageRef, file, metadata)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(`Upload is ${progress.toFixed(0)}% done`)
      },
      (error) => {
        console.error(" Upload failed:", error)
        alert("Upload failed. Check the console for details.")
      },
     
    )
  }

  return (
    <div className="p-5 px-8 md:px-28">
      <h2 className="text-[20px] text-center m-5">
        Start <strong className="text-blue-700">Uploading</strong> File and <strong className="text-blue-700">Share</strong> it
      </h2>
      <Uploadform onUpload={upload} />
    </div>
  )
}

export default Page
 // async () => {
      //   const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
      //   console.log("✅ File available at:", downloadURL)
      //   alert("Upload successful! Link copied to console.")
      // },