'use client'

import { useState } from 'react'
import removeIcon from '../assets/icons/del-icon.svg'
import Image from 'next/image'
import { useAppData } from '@/context/AppDataContext'

const input = [
  {
    label: 'Enter Amount',
    placeholder: '',
    type: 'number',
    className: '',
    deleteBtn: true
  }
]

const StepTwo = () => {
  const { currStep, setCurrStep, blink } = useAppData()

  return (
    <div className='flex items-center flex-col gap-10'>
      <div className='flex-center flex-col gap-2'>
        <div className={`flex flex-col gap-1 `}>
          <label htmlFor='title' className='text-lg px-2'>
            Your Blink
          </label>
          <div className='flex gap-3 items-center'>
            <div className='p-[1px] rounded-[15px] gradient_700_800 w-max'>
              <input
                type='text'
                value={blink}
                className='px-2 h-12 w-[500px] rounded-[14px] bg-jaguar-950 overflow-hidden'
              />
            </div>
          </div>
        </div>
        {/* Inputs End*/}
      </div>

      <div className='flex flex-col items-center'>
        <div className='flex'>
          {/* Button Start */}
          <div
            className={`gradient_700_800 h-max w-max m-2 rounded-xl p-[1px] ${
              currStep === 1 ? 'opacity-50' : ''
            }`}
          >
            <a
              className={`flex-center  h-12 w-52 gradient_hero rounded-xl`}
              href={`https://twitter.com/intent/tweet?text=${blink}`}
              target='_blank'
            >
              Share on X
            </a>
          </div>

          <div
            className={`gradient_700_800 h-max w-max m-2 rounded-xl p-[1px]`}
          >
            <a
              href={`https://dial.to/developer?url=${blink}`}
              target='_blank'
              className={`flex-center  h-12 w-52 gradient_700_800 rounded-xl`}
            >
              Preview
            </a>
          </div>
          {/* Button End */}
        </div>
      </div>
    </div>
  )
}

export default StepTwo
