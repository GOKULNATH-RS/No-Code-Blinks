'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

type AppDataContextType = {
  currStep: number
  setCurrStep: (step: number) => void
}

var AppDataContext = createContext<AppDataContextType | undefined>(undefined)

type Props = {
  children: ReactNode
}

export const AppDataContextProvider = ({ children }: Props) => {
  const [currStep, setCurrStep] = useState(1)
  return (
    <AppDataContext.Provider value={{ currStep, setCurrStep }}>
      {children}
    </AppDataContext.Provider>
  )
}

export const useAppData = () => {
  const context = useContext(AppDataContext)
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataContextProvider')
  }
  return context
}
