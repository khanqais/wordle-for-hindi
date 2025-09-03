'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

/* ------------ 1.  Types ------------- */
type AppState = {
  username: string | null
  login: (name: string) => void
  logout: () => void
}

/* ------------ 2.  Context ------------- */
const AppContext = createContext<AppState | undefined>(undefined)

/* ------------ 3.  Provider ------------- */
export function AppContextProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null)

  const login = (name: string) => setUsername(name)
  const logout = () => setUsername(null)

  const value: AppState = { username, login, logout }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

/* ------------ 4.  Custom Hook ------------- */
export function useAppContext() {
  const ctx = useContext(AppContext)
  if (ctx === undefined) {
    throw new Error('useAppContext must be used within <AppContextProvider>')
  }
  return ctx
}
