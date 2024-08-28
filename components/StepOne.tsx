'use client'

import { useAppData } from '@/context/AppDataContext'
import React, { useState } from 'react'

const input = [
  {
    label: 'Title',
    placeholder: '',
    type: 'text',
    className: '',
    deleteBtn: false
  },
  {
    label: 'Description',
    placeholder: '',
    type: 'text',
    className: '',
    deleteBtn: false
  },
  {
    label: 'Image Url',
    placeholder: '',
    type: 'text',
    className: '',
    deleteBtn: false
  },
  {
    label: 'Destination wallet address',
    placeholder: '',
    type: 'text',
    className: '',
    deleteBtn: false
  }
]

const StepOne = () => {
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
            </div>
          </div>
        ))}

        {/* Inputs End*/}
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
            className={`flex-center  h-12 w-52 gradient_hero rounded-xl`}
          >
            Previous
          </button>
        </div>
        <div className={`gradient_700_800 h-max w-max m-2 rounded-xl p-[1px]`}>
          <button
            onClick={() => setCurrStep(currStep + 1)}
            className={`flex-center  h-12 w-52 gradient_700_800 rounded-xl`}
          >
            Next Step
          </button>
        </div>
        {/* Button End */}
      </div>
    </div>
  )
}

export default StepOne
