import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <Image
        height={150}
        width={150}
        alt='Logo'
        src={"/logo.svg"}
    />
  )
}

export default Logo