'use client'

import Image from 'next/image'

function CustomImageRenderer({ data }: any) {
  const src = data.file.url

  return (
    <div className='relative w-full h-[4rem] max-h-[15rem]'>
      <Image alt='image' className='object-fit' fill src={src} />
    </div>
  )
}

export default CustomImageRenderer