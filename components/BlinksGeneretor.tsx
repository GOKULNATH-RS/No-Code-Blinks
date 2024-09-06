'use client'

import { useAppData } from '@/context/AppDataContext'
import Blink from './Blink'
import StepNav from './StepNav'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'

const BlinksGeneretor = () => {
  const { currStep } = useAppData()
  return (
    <div className='flex justify-between my-12 py-12'>
      <div className='flex-1 max-lg:hidden'>
        <Blink />
      </div>
      <div className='flex-1 flex flex-col justify-center gap-8  relative min-h-32'>
        <StepNav />
        {currStep === 1 && <StepOne />}
        {currStep === 2 && <StepTwo />}
        {currStep === 3 && <StepThree />}
      </div>
    </div>
  )
}

export default BlinksGeneretor
