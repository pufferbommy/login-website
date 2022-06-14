import { useState } from 'react'
import UserContext from '../contexts/UserContext'

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({})

  const providerValues = {
    user,
    setUser,
  }

  return (
    <UserContext.Provider value={providerValues}>{children}</UserContext.Provider>
  )
}

export default UserContextProvider
