import { useState } from 'react'
import {
  useToast,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
    expiresIn: 2000000,
  })
  const toast = useToast()
  const navigate = useNavigate()
  const { setUser } = useUserContext()

  const handleChangeValue = (e) => {
    const { name, value } = e.target
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('https://www.mecallapi.com/api/login', {
        method: 'post',
        body: JSON.stringify(values),
        headers: [['Content-Type', 'application/json']],
      })
      const { status, message, accessToken, user: fetchedUser } = await res.json()

      if (status === 'error') throw message

      toast({ title: message, status: 'success' })
      localStorage.setItem('token', accessToken)

      setUser(fetchedUser)
      navigate('/profile')
    } catch (err) {
      toast({ title: err, status: 'error' })
    }
  }

  return (
    <Box padding="8">
      <Heading textAlign="center" marginBottom="4" as="h1">
        Login
      </Heading>
      <Flex as="form" alignItems="center" flexDir="column" onSubmit={handleSubmit}>
        <FormControl width={{ base: '100%', md: '50%', xl: '25%' }}>
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            value={values.username}
            onChange={handleChangeValue}
            type="text"
          />
        </FormControl>
        <FormControl marginTop="2" width={{ base: '100%', md: '50%', xl: '25%' }}>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            value={values.password}
            onChange={handleChangeValue}
            type="text"
          />
        </FormControl>
        <Button
          paddingY="6"
          colorScheme="blue"
          width={{ base: '100%', md: '50%', xl: '25%' }}
          marginTop="4"
          type="submit"
        >
          Submit
        </Button>
      </Flex>
    </Box>
  )
}
export default Login
