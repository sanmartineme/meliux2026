import React, { createContext, useContext, useState } from 'react'

interface AppState {
  hasProfile: boolean
  profileName: string
  setProfile: (name: string) => void
  starredRatings: Record<string, number>
  setRating: (id: string, rating: number) => void
  sentRecommendations: Record<string, string[]>
  addRecommendation: (contentId: string, contactId: string) => void
}

const AppCtx = createContext<AppState>({} as AppState)
export const useApp = () => useContext(AppCtx)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [hasProfile, setHasProfile] = useState(false)
  const [profileName, setProfileNameState] = useState('')
  const [starredRatings, setStarredRatings] = useState<Record<string, number>>({})
  const [sentRecommendations, setSentRecommendations] = useState<Record<string, string[]>>({})

  const setProfile = (name: string) => { setProfileNameState(name); setHasProfile(true) }
  const setRating = (id: string, rating: number) =>
    setStarredRatings(prev => ({ ...prev, [id]: rating }))
  const addRecommendation = (contentId: string, contactId: string) =>
    setSentRecommendations(prev => ({
      ...prev,
      [contentId]: [...(prev[contentId] || []), contactId]
    }))

  return (
    <AppCtx.Provider value={{ hasProfile, profileName, setProfile, starredRatings, setRating, sentRecommendations, addRecommendation }}>
      {children}
    </AppCtx.Provider>
  )
}
