import Button from '@/ui/Button'
import { Input } from '@/ui/Input'
import removeIcon from '../assets/icons/del-icon.svg'
import Image from 'next/image'
import { type } from 'os'
import Header from '@/components/Header'
import heroImg from '../assets/hero-img.png'
import BlinksGeneretor from '@/components/BlinksGeneretor'

export default function Home() {
  return (
    <div className='text-white gradient_hero min-h-screen font-powerGrotesk px-40 py-8'>
      <Header />
      <main className='w-full flex-center flex-col gap-4 my-8'>
        <div className='flex flex-col items-center my-6 z-[2]'>
          <h1 className='text-[70px] leading-[1]'>Blinks ,made Easy</h1>
          <h1 className='text-[26px]'>Generate Blinks with few clicks</h1>
        </div>

        <div className='relative'>
          <Image
            src={heroImg}
            height={480}
            width={720}
            alt='hero'
            className='relative z-[3]'
          />
          <div className='absolute top-0 left-1/3  gradient_ball h-[400px] w-[400px] z-[1]' />
        </div>
      </main>

      <BlinksGeneretor />
    </div>
  )
}
