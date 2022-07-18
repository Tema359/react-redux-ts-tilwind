import { Route, Routes } from 'react-router-dom'
import AirportDetailPage from './pages/AirportDetailPage'
import AuthPage from './pages/AuthPage'
import MainPage from './pages/MainPage'
import Navigation from './components/Navigation'
import { useAppDispatch } from './hooks/redux'
import { useEffect } from 'react'
import { fetchHadbooks } from './store/actions/handbookActions'

export default function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchHadbooks())
  }, [dispatch])

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