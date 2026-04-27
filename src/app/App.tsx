import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context'
import OnboardingPage  from './pages/OnboardingPage'
import SplashPage      from './pages/SplashPage'
import LoginPage       from './pages/LoginPage'
import ProfilePage     from './pages/ProfilePage'
import HomePage        from './pages/HomePage'
import ContentDetailPage from './pages/ContentDetailPage'
import VideoPlayerPage from './pages/VideoPlayerPage'
import RecommendPage   from './pages/RecommendPage'

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/"               element={<SplashPage />} />
        <Route path="/onboarding"     element={<OnboardingPage />} />
        <Route path="/login"          element={<LoginPage />} />
        <Route path="/profile"        element={<ProfilePage />} />
        <Route path="/home"           element={<HomePage />} />
        <Route path="/content/:id"    element={<ContentDetailPage />} />
        <Route path="/player/:id"     element={<VideoPlayerPage />} />
        <Route path="/recommend/:id"  element={<RecommendPage />} />
        <Route path="*"               element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  )
}
