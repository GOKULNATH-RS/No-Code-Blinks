'use client'

import { useEffect, useState } from 'react'
import removeIcon from '../assets/icons/del-icon.svg'
import Image from 'next/image'
import { useAppData } from '@/context/AppDataContext'
import { v4 } from 'uuid'
import axios from 'axios'
import { useFormData } from '@/context/FormContext'

const StepTwo = () => {
  const { currStep, setCurrStep, setBlink } = useAppData()
  const {
    title,
    description,
    imageUrl,
    destinationWalletAddress,
    actionAmount,
    setActionAmount
  } = useFormData()
  const [value, setValue] = useState('0')
  const [amounts, setAmounts] = useState<any>([
    {
      id: v4(),
      label: 'Enter Amount',
      placeholder: '',
      value: value,
      setValue: setValue,
      deleteBtn: true
    }
  ])

  function handleAddAmount() {
    amounts[amounts.length - 1].value = value

    setAmounts([
      ...amounts,
      {
        id: v4(),
        label: 'Enter Amount',
        placeholder: '',
        value: value,
        setValue: setValue,
        deleteBtn: true
      }
    ])

    setValue('0')
  }

  function handleDeleteAmount(id: string) {
    console.log('ID', id)
    console.log('Amounts BEFORE ', amounts)
    const newAmounts = amounts.filter((amount: any) => {
      if (amount.id !== id) {
        return amount
      }
    })
    console.log('Amounts AFTER ', amounts)
    setAmounts(newAmounts)
  }

  function handleGenerate() {
    amounts[amounts.length - 1].value = value

    const amountsValue = amounts.map((amount: any) => {
      console.log('Amount', amount)
      return { amount: amount.value }
    })
    setActionAmount(amountsValue)

    console.log('server url', process.env.NEXT_PUBLIC_SERVER_URL)

    axios
      .post(`/api/generate/donate`, {
        blinkId: v4(),
        title,
        description,
        icon: imageUrl,
        toPubKey: destinationWalletAddress,
        actions: amountsValue
      })
      .then((res) => {
        setBlink(res.data.blink)
        setCurrStep(currStep + 1)
        console.log(res.data)
      })
  }

  return (
    <div className='flex items-center flex-col gap-10'>
      <div className='flex-center flex-col gap-2'>
        {/* Inputs start*/}
        {amounts.map((inp: any, index: number) => {
          return (
            <div className={`flex flex-col gap-1 `} key={index}>
              <label className='text-lg px-2'>{inp.label}</label>
              <div className='flex gap-3 items-center'>
                <div className='p-[1px] rounded-[15px] gradient_700_800 w-max'>
                  <input
                    type='text'
                    onChange={(e) => {
                      inp.setValue(e.target.value)
                    }}
                    placeholder={inp.placeholder}
                    className='px-2 h-12 w-[320px] rounded-[14px] bg-jaguar-950'
                  />
                </div>
                <div className=''>
                  {inp.deleteBtn && (
                    <div
                      onClick={() => handleDeleteAmount(inp.id)}
                      className='rounded-xl p-2 border-[#8F0000] border-[1px]'
                    >
                      <Image src={removeIcon} alt='remove' />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        {/* Inputs End*/}
      </div>
      <div>
        <div className={`gradient_700_800 rounded-xl`}>
          <button
            onClick={() => handleAddAmount()}
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
              onClick={() => {
                handleGenerate()
                // setCurrStep(currStep + 1)
              }}
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
