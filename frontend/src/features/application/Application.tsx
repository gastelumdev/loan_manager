import { Badge, Box, Card, CardBody, Center, Flex, Heading, Spacer, Stack, Text } from '@chakra-ui/react'
import SubmitApplication from './SubmitApplication'
import { useDeleteApplicationMutation, useGetUserApplicationsQuery } from '../../app/services/api';
import { useParams } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

const Application = () => {
    const {id} = useParams()
    const {data: applications, refetch} = useGetUserApplicationsQuery(id);
    const [deleteApplcation] = useDeleteApplicationMutation();

    useEffect(() => {
        const socket = io(import.meta.env.VITE_API_URL);
        socket.connect();

        socket.on("update applications", () => {
            refetch();
        })
    }, [refetch]);
    
    return (
        <Box p={"50px"} px={{md: "200px"}}>
            <Flex>
                <Heading mb={"20px"} size={"lg"}>User Dashboard</Heading>
                <Spacer />
                <Box mb={"40px"}>
                    <SubmitApplication />
                </Box>
            </Flex>
            <Box >
                {applications?.length > 0 ? applications?.map((application: any) => {
                    return (
                        <Card key={application.id.toString()} mt={"20px"}>
                            <CardBody>
                                <Flex>
                                    <Stack>
                                        <Heading size={"sm"}>{application.fullname}</Heading>
                                        <Text>${application.amount}</Text>
                                    </Stack>
                                    <Spacer />
                                    <Box>
                                        <Stack>
                                            <Text textAlign={"right"} fontSize={"10px"} cursor={"pointer"} onClick={() => deleteApplcation(application.id)} color={"darkgray"}>
                                                <CloseIcon />
                                            </Text>
                                            <Text><Badge colorScheme={application.status === "Approved" ? "green" : application.status === "Denied" ? "red" : "purple"}>{application.status}</Badge></Text>
                                            
                                        </Stack>
                                    </Box>
                                </Flex>
                            </CardBody>
                        </Card>)
                    }) : <Center><Text>Click "Apply" to submit a loan application.</Text></Center>}
            </Box>
        </Box>
    )
}

export default Application