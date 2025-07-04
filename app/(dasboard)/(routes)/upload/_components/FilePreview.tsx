"use client"
import React from 'react'
import { File, X } from 'lucide-react'
import Image from 'next/image'

const FilePreview = ({ file, removeFile }: { file: File, removeFile: (file: File) => void }) => {
  return (
    <div className='flex w-1/3 items-center gap-2 justify-center mx-auto mt-5 border rounded-md border-blue-200'>
     <div className='flex items-center p-4'>
      <File className='text-blue-500 h-15 w-15' />
      
      <div className='text-left'>
        <h2>{file.name}</h2>
        <h2 className='text-[12px] text-gray-400'>{file?.type}/{(file.size/1024/1024).toFixed(2)}MB</h2>
      </div>
      <X className="text-red-500 cursor-pointer" onClick={() => removeFile(file)} />
    </div>
    </div>
  )
}

export default FilePreview
