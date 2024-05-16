import React, { useState } from 'react'
import {Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, useDisclosure} from "@chakra-ui/react"
import { TApplication } from '../../types/application';
import { useParams } from 'react-router-dom';
import { useCreateApplicationMutation } from '../../app/services/api';

const SubmitApplication = () => {
  const {id} = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null);

  
  const [createApplication] = useCreateApplicationMutation()

  const [formData, setFormData] = useState<TApplication>({organization: Number(id), status: "Waiting", amount: 0, fullname: ""});

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = event.target.value;
    if (event.target.name === "amount") {
      value = Number(event.target.value)
    }
    setFormData((prev) => ({...prev, [event.target.name]: value}))
  }

  const handleSubmit = () => {
    createApplication(formData);
    handleOnClose()
  }

  const handleOnClose = () => {
    setFormData({organization: Number(id), status: "Waiting", amount: 0, fullname: ""})
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen}>Apply</Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={handleOnClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apply for a loan</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Full name</FormLabel>
              <Input ref={initialRef} placeholder='Full name' value={formData.fullname} name={"fullname"} onChange={handleOnChange} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input type='number' placeholder='Amount' name={"amount"} value={formData.amount === 0 ? "" : formData.amount} onChange={handleOnChange}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit} isDisabled={formData.fullname === "" || formData.amount === 0}>
              Apply
            </Button>
            <Button onClick={handleOnClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
  
}

export default SubmitApplication