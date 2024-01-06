import React from 'react'

interface PageProps {
    params: {
      id: string;
    };
  }
  const Page = async ({ params }: PageProps) => {
    const { id } = params;
  return (
    <div>{id}</div>
  )
}

export default Page