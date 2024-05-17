import { Box, Button, Card, CardBody, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, FormLabel, Input, Spacer, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react';
import { useCreateUserMutation, useGetUsersQuery } from '../../app/services/api';
import { TUser } from '../../types/user';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate()

    const {data: users} = useGetUsersQuery()
    const [createUser] = useCreateUserMutation();

    const [fullname, setFullname] = useState("");

    const handleClick = async () => {
        const user = await createUser({fullname});
        console.log(user)

        if (user.data) {
            navigate(`/user/${user.data.id}`)
        }

        setFullname("");
    }

    return (
        <>
            <Button
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                onClick={onOpen}
                _hover={{
                    bg: 'blue.500',
                }}>
                    Apply
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                size={"md"}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth='1px'>
                    Let us know who you are
                </DrawerHeader>

                <DrawerBody>
                    <Stack spacing='24px'>
                        <Box>
                            <FormLabel htmlFor='username'>Enter your name or select from list below</FormLabel>
                            <Input
                                id='fullname'
                                placeholder='Please enter full name'
                                value={fullname}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFullname(event.target.value)}
                            />
                        </Box>
                        <Flex>
                            <Spacer />
                            <Button colorScheme='blue' onClick={handleClick}>Next</Button>
                        </Flex>
                        <Box>
                            <Stack>
                                {users?.map((user: TUser) => {
                                    return (
                                    <Card key={user.id.toString()} as="a" href={`/user/${user.id}`}>
                                        <CardBody>
                                            <Flex>
                                                <Text>{user.fullname}</Text>
                                                <Spacer />
                                            </Flex>
                                        </CardBody>
                                    </Card>)
                                })}
                            </Stack>
                        </Box>
                    </Stack>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default User