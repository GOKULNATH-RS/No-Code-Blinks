'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

type AppDataContextType = {
  currStep: number
  setCurrStep: (step: number) => void
  blink: string
  setBlink: (blink: string) => void
}

var AppDataContext = createContext<AppDataContextType | any>({})

type Props = {
  children: ReactNode
}

export const AppDataContextProvider = ({ children }: Props) => {
  const [currStep, setCurrStep] = useState(1)
  const [blink, setBlink] = useState('')

  return (
    <AppDataContext.Provider value={{ currStep, setCurrStep, blink, setBlink }}>
      {children}
    </AppDataContext.Provider>
  )
}

export const useAppData = () => {
  const context = useContext(AppDataContext)

  return context
}
