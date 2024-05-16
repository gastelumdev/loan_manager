import { Box, Button, Card, CardBody, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, FormLabel, Input, Spacer, Stack, useDisclosure } from '@chakra-ui/react'

const User = () => {
const { isOpen, onOpen, onClose } = useDisclosure();

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
                        />
                    </Box>
                    <Flex>
                        <Spacer />
                        <Button colorScheme='blue'>Submit</Button>
                    </Flex>
                    <Box>
                        <Stack>
                            <Card as="a" href={`/user/${1}`}>
                                <CardBody>
                                    Organization 1
                                </CardBody>
                            </Card>
                            <Card as="a" href={`/user/${2}`}>
                                <CardBody>
                                    Organization 2
                                </CardBody>
                            </Card>
                            <Card as="a" href={`/user/${3}`}>
                                <CardBody>
                                    Organization 3
                                </CardBody>
                            </Card>
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