import { Route, Routes } from 'react-router-dom'
import AirportDetailPage from './pages/AirportDetailPage'
import AuthPage from './pages/AuthPage'
import MainPage from './pages/MainPage'
import Navigation from './components/Navigation'

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={ <MainPage /> } />
        <Route path="/auth" element={ <AuthPage /> } />
        <Route path="/airport/:id" element={ <AirportDetailPage /> } />
      </Routes>
    </>
  )
}