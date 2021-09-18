import { createContext, useState } from "react";
import { CircularProgress } from '@mui/material'

interface LoadingProps {
  isLoading: boolean,
  setLoading: (isLoading: boolean) => void
}

export const LoadingContext = createContext<LoadingProps>({ isLoading: false, setLoading: () => {} });

interface LoadingProviderProps {}

export const LoadingProvider:React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setLoading] = useState<boolean>();

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {isLoading ?
        <CircularProgress /> :
        null
      }
      {children}
    </LoadingContext.Provider>
  )
}
