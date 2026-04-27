import { createBrowserRouter } from 'react-router';
import { SplashPage } from './pages/SplashPage';
import { LoginPage } from './pages/LoginPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { ProfilePage } from './pages/ProfilePage';
import { HomePage } from './pages/HomePage';
import { ContentDetailPage } from './pages/ContentDetailPage';
import { VideoPlayerPage } from './pages/VideoPlayerPage';
import { RecommendPage } from './pages/RecommendPage';

export const router = createBrowserRouter([
  { path: '/', Component: SplashPage },
  { path: '/login', Component: LoginPage },
  { path: '/onboarding', Component: OnboardingPage },
  { path: '/perfil', Component: ProfilePage },
  { path: '/home', Component: HomePage },
  { path: '/contenido/:id', Component: ContentDetailPage },
  { path: '/reproducir/:id', Component: VideoPlayerPage },
  { path: '/recomendar/:id', Component: RecommendPage },
  { path: '*', Component: SplashPage },
]);