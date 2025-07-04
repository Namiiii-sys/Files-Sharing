"use client"
import React, { useState } from 'react'
import FilePreview from './FilePreview'

const Uploadform = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onFileSelect =(file) => {
    console.log('Selected file:', file)
    if(file&&file.size>2000000)
    {
      alert("size is greater than 2 Mb")
      return ;
    }
    setSelectedFile(file)
  }

 const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    onFileSelect(file);
  }
}


  const handleUpload = () => {
    if (!selectedFile) return
    console.log('Uploading:', selectedFile)
  }

  return (
    <div className="text-center">
      

      <div className="flex items-center justify-center w-4/5 mx-auto mt-10">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-500 border-dashed rounded-lg cursor-pointer bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-4 text-blue-700 dark:text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or{' '}
              <strong className="text-blue-500">drag</strong> and{' '}
              <strong className="text-blue-500">drop</strong>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, PDF (Max size: 2MB)
            </p>
            {selectedFile && (
              <p className="mt-4 text-sm text-blue-600 dark:text-blue-300 font-medium">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

     {file?} <FilePreview file={selectedFile} />
      <button
        onClick={handleUpload}
        disabled={!selectedFile}
        className={`mt-10 px-4 py-2 w-[30%] rounded-full text-white transition ${
          selectedFile
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Upload
      </button>
    </div>
  )
}

export default Uploadform
