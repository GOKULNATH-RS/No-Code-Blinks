'use client'

import Image from 'next/image'
import logo from '../assets/BlinksEasy.svg'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { useFormData } from '@/context/FormContext'
import { set } from 'mongoose'

const Header = () => {
  const { publicKey } = useWallet()
  const [isClient, setIsClient] = useState(false)
  const { setDestinationWalletAddress, destinationWalletAddress } =
    useFormData()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    setDestinationWalletAddress(publicKey?.toBase58() || '')
  }, [publicKey])

  return (
    <nav className='flex justify-between'>
      <div>
        <Image src={logo} height={36} width={86} alt='logo' />
      </div>
      <div>
        <div
          className={`gradient_700_800 h-max w-max m-2 rounded-xl
          `}
        >
          <button
            className={`flex-center max-h-12 max-w-52 gradient_600_700 bg-opacity-70
            rounded-xl`}
          >
            {isClient && (
              <WalletMultiButton
                style={{
                  backgroundColor: 'transparent',
                  height: '100%',
                  width: '100%'
                }}
              />
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
