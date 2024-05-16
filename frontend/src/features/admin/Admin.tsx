import {Box, Card, CardBody, Center, Flex, Heading, Select, Spacer, Stack, Text} from "@chakra-ui/react"
import { TApplication } from '../../types/application';
import { useGetApplicationsQuery, useUpdateApplicationMutation } from "../../app/services/api";
import { io } from 'socket.io-client';
import { useEffect } from "react";

const Admin = () => {
    const {data: applications, refetch} = useGetApplicationsQuery();
    const [updateApplication] = useUpdateApplicationMutation();

    const handleSelectChange = (value: string, application: TApplication) => {
        updateApplication({...application, status: value});
    }

    useEffect(() => {
        const socket = io("http://localhost:8000");
        socket.connect();

        socket.on("update applications", () => {
            refetch();
        })
    }, [refetch]);

    return (
        <Box p={"50px"}  px={{md: "200px"}}>
            <Flex>
                <Heading mb={"20px"} size={"lg"}>Admin Dashboard</Heading>
            </Flex>
            <Box>
                {applications?.length > 0 ? applications?.map((application: any) => {
                    return (
                        <Card key={application.id.toString()} mt={"20px"}>
                            <CardBody>
                                <Flex>
                                    <Stack>
                                        <Heading size={"sm"}>{application.fullname}</Heading>
                                        <Text>Submitted by: User {application.organization}</Text>
                                        
                                    </Stack>
                                    <Spacer />
                                    <Box>
                                        <Text mb={"10px"}>${application.amount}</Text>
                                        
                                        <Select placeholder={""} value={application.status} size='xs' disabled={application.status === "Approved" || application.status === "Denied"} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleSelectChange(event.target.value, application)}>
                                            <option value='Waiting'>Waiting</option>
                                            <option value='Approved'>Approved</option>
                                            <option value='Denied'>Denied</option>
                                        </Select>
                                        
                                    </Box>
                                </Flex>
                            </CardBody>
                        </Card>)
                    }) : <Center><Text>There are no applications pending.</Text></Center>}
            </Box>
        </Box>
    )
}

export default Admin