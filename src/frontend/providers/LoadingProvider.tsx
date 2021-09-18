import { createContext, useState } from "react";

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
      {children}
    </LoadingContext.Provider>
  )
}
