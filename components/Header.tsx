'use client'

import Image from 'next/image'
import logo from '../assets/BlinksEasy.svg'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect } from 'react'
import { useFormData } from '@/context/FormContext'

const Header = () => {
  const { publicKey } = useWallet()
  const { setDestinationWalletAddress, destinationWalletAddress } =
    useFormData()

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
            className={`flex-center h-12 w-52 gradient_600_700 bg-opacity-70
            rounded-xl`}
          >
            <WalletMultiButton
              style={{
                backgroundColor: 'transparent',
                height: '100%',
                width: '100%'
              }}
            />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
