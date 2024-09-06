'use client'

import copyIcon from '../assets/icons/copy-icon.png'
import tickIcon from '../assets/icons/tick-icon.png'
import Image from 'next/image'
import { useAppData } from '@/context/AppDataContext'
import { toast } from 'sonner'
import { useState } from 'react'

const StepTwo = () => {
  const { currStep, blink } = useAppData()
  const [icon, setIcon] = useState(copyIcon)

  return (
    <div className='flex items-center flex-col gap-10'>
      <div className='flex-center flex-col gap-2 '>
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
            <div className=''>
              <div
                onClick={() =>
                  navigator.clipboard.writeText(blink).then(() => {
                    setIcon(tickIcon)
                    toast.success('Copied to clipboard', {
                      style: {
                        background: '#0a0613',
                        color: '#fff',
                        borderWidth: '0px'
                      }
                    })
                  })
                }
                className='rounded-xl p-2 cursor-pointer'
              >
                <Image src={icon} alt='remove' />
              </div>
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
              href={`https://twitter.com/intent/tweet?text=https://dial.to/?action=solana-action:${blink}`}
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
