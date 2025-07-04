import React from 'react'
import Image from 'next/image'

const FilePreview = () => {
  return (
    <div>
      <Image src='/file.png' 
      width={50}
      height={50}
      alt='file preview'
      className='rounded-md' />
      <div>
        <h2>{file.name}</h2>
      </div>
    </div>
  )
}

export default FilePreview
