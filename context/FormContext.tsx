'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

type FormContextType = {
  title: string
  setTitle: (title: string) => void
  description: string
  setDescription: (description: string) => void
  imageUrl: string
  setImageUrl: (imageUrl: string) => void
  destinationWalletAddress: string
  setDestinationWalletAddress: (destinationWalletAddress: string) => void
  actionAmount: any
  setActionAmount: (actionAmount: any) => void
}

var FormContextType = createContext<FormContextType | any>({})

type Props = {
  children: ReactNode
}

export const FormDataContextProvider = ({ children }: Props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [destinationWalletAddress, setDestinationWalletAddress] = useState('')
  const [actionAmount, setActionAmount] = useState([])

  return (
    <FormContextType.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        imageUrl,
        setImageUrl,
        destinationWalletAddress,
        setDestinationWalletAddress,
        actionAmount,
        setActionAmount
      }}
    >
      {children}
    </FormContextType.Provider>
  )
}

export const useFormData = () => {
  const context = useContext(FormContextType)

  return context
}
