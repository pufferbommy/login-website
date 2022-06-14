import {
  Image,
  Flex,
  Box,
  SkeletonCircle,
  Skeleton,
  Heading,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'

const Profile = ({ isLoading }) => {
  const navigate = useNavigate()
  const { user, setUser } = useUserContext()
  const toast = useToast()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser({})
    toast({
      title: 'Logout success',
      status: 'success',
    })
    navigate('/')
  }

  if (isLoading) {
    return (
      <Flex flexDir="column" alignItems="center">
        <Flex
          marginY="8"
          alignItems="center"
          gap="80"
          justifyContent="space-between"
        >
          <Skeleton width="125px" height="50px" />
          <Skeleton width="80px" height="40px" />
        </Flex>
        <Flex gap="8" alignItems="center">
          <Box boxSize="2xs">
            <SkeletonCircle height="full" width="full" />
          </Box>
          <Box>
            <Skeleton width="200px" height="75px" marginBottom="2" />
            <Skeleton />
          </Box>
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex flexDir="column" alignItems="center">
      <Flex alignItems="center" marginY="8" gap="80" justifyContent="space-between">
        <Heading as="h1">Profile</Heading>
        <Button onClick={handleLogout}>Logout</Button>
      </Flex>
      <Flex gap="8" alignItems="center">
        <Box boxSize="2xs">
          <Image width="full" src={user?.avatar} />
        </Box>
        <Box>
          <Heading as="h2" marginBottom="2" size="lg">
            {user?.fname + ' ' + user?.lname}
          </Heading>
          <p>{user?.email}</p>
        </Box>
      </Flex>
    </Flex>
  )
}
export default Profile
