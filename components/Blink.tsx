import React from 'react'
import blink from '../assets/Blink.png'
import Image from 'next/image'

const Blink = () => {
  return (
    <div className='flex-center'>
      <Image src={blink} height={480} width={380} alt='blink' />
    </div>
  )
}

export default Blink
