import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider from './components/UserContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
