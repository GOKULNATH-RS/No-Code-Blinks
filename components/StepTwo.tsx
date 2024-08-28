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
  const { currStep, setCurrStep } = useAppData()

  return (
    <div className='flex items-center flex-col gap-10'>
      <div className='flex-center flex-col gap-2'>
        {/* Inputs start*/}
        {input.map((inp, index) => (
          <div className={`flex flex-col gap-1 `} key={index}>
            <label htmlFor='title' className='text-lg px-2'>
              {inp.label}
            </label>
            <div className='flex gap-3 items-center'>
              <div className='p-[1px] rounded-[15px] gradient_700_800 w-max'>
                <input
                  type={inp.type}
                  placeholder={inp.placeholder}
                  className='px-2 h-12 w-[320px] rounded-[14px] bg-jaguar-950'
                />
              </div>
              <div className=''>
                {inp.deleteBtn && (
                  <div className='rounded-xl p-2 border-[#8F0000] border-[1px]'>
                    <Image src={removeIcon} alt='remove' />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {/* Inputs End*/}
      </div>
      <div>
        <div className={`gradient_700_800 rounded-xl`}>
          <button
            disabled={currStep === 1}
            className={`flex-center  h-10 w-48 gradient_hero rounded-xl dashed`}
          >
            Add amount
          </button>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <div className='flex items-center gap-2'>
          <input
            id='input-checkbox'
            type='checkbox'
            value=''
            className='w-4 h-4 text-jaguar-600 bg-jaguar-950 border-jaguar-600 rounded-xl'
          />
          <label htmlFor='input-checkbox'>Add a custom input </label>
        </div>
        <div className='flex'>
          {/* Button Start */}
          <div
            className={`gradient_700_800 h-max w-max m-2 rounded-xl p-[1px] ${
              currStep === 1 ? 'opacity-50' : ''
            }`}
          >
            <button
              disabled={currStep === 1}
              onClick={() => setCurrStep(currStep - 1)}
              className={`flex-center  h-12 w-52 gradient_hero rounded-xl`}
            >
              Previous
            </button>
          </div>
          <div
            className={`gradient_700_800 h-max w-max m-2 rounded-xl p-[1px]`}
          >
            <button
              disabled={currStep === 1}
              onClick={() => setCurrStep(currStep + 1)}
              className={`flex-center  h-12 w-52 gradient_700_800 rounded-xl`}
            >
              Generate
            </button>
          </div>
          {/* Button End */}
        </div>
      </div>
    </div>
  )
}

export default StepTwo
