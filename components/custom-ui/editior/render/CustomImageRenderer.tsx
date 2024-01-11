'use client'

import Image from 'next/image'

function CustomImageRenderer({ data }: any) {
  const src = data.file.url

  return (
    <div className='relative w-full h-[2rem]'>
      <Image alt='image' className='object-contain' fill src={src} />
    </div>
  )
}

export default CustomImageRenderer