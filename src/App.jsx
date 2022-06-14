import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import useUserContext from './hooks/useUserContext'

// Pages
import Login from './pages/Login'
import Profile from './pages/Profile'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useUserContext()

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        const res = await fetch('https://www.mecallapi.com/api/auth/user', {
          method: 'get',
          headers: [
            ['Content-Type', 'application/json'],
            ['Authorization', `Bearer ${token}`],
          ],
        })
        const { status, message, user: fetchedUser } = await res.json()

        if (status === 'error' || status === 'forbidden') throw message

        setUser(fetchedUser)
        navigate('/profile')
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getCurrentUser()
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile isLoading={isLoading} />} />
      </Routes>
    </>
  )
}
export default App
