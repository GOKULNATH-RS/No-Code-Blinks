'use client'

import { useAppData } from '@/context/AppDataContext'
import { useState } from 'react'

const StepNav = () => {
  const { currStep } = useAppData()
  return (
    <nav className='flex justify-evenly items-center w-full border-t-jaguar-800 border-t-[2px] my-8'>
      <div
        className={`${
          currStep === 1
            ? 'gradient_nav_active border-t-jaguar-800  border-t-[2px]'
            : ''
        } flex-center py-4 flex-1`}
      >
        Step One
      </div>
      <div
        className={`${
          currStep === 2
            ? 'gradient_nav_active border-t-jaguar-800  border-t-[2px]'
            : ''
        } flex-center py-4 flex-1`}
      >
        Step Two
      </div>
      <div
        className={`${
          currStep === 3
            ? 'gradient_nav_active border-t-jaguar-800  border-t-[2px]'
            : ''
        } flex-center py-4 flex-1`}
      >
        Share
      </div>
    </nav>
  )
}

export default StepNav
