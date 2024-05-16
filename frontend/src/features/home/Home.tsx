import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import User from '../user/User';

const Home = () => {
  return (
    <>
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'lg'}>
                <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                    
                    <br />{' '}
                    <Text color={'blue.400'} as={'span'}>
                    Loan Manager
                    </Text>{' '}
                </Heading>
                <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                    Applying for a loan with us is quick and easy. Click "Apply" to submit a loan application or manage applications with the admin dashboard.
                </Text>
                <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                    <User />
                    <Button rounded={'full'} as={"a"} href='/admin'>Admin</Button>
                </Stack>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                alt={'Login Image'}
                objectFit={'cover'}
                src={
                    'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                }
                />
            </Flex>
        </Stack>
    </>
  )
}

export default Home