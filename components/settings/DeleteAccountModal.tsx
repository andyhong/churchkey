import { ChangeEvent, useState } from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, Input, useDisclosure, Text } from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query'
import { signOut } from 'next-auth/react'
import axios from 'axios'

type DeleteAccountModalProps = {
  url: string
}

const DeleteAccountModal: React.FunctionComponent<DeleteAccountModalProps> = ({ url }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setLoading] = useState(false)
  const [confirm, setConfirm] = useState('')

  const deleteAccount = useMutation(
    (values: { url: string}) => axios.delete('/api/me', { data: values }),
    {
      onSuccess: () => {
        signOut({ callbackUrl: "http://localhost:3000/" })
      }
    }
  )

  const handleDelete = () => {
    deleteAccount.mutate({ url: url})
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirm(e.target.value)
  }

  const handleClose = () => {
    onClose()
    setConfirm('')
  }

  return (
    <>
      <Button
        colorScheme="red"
        onClick={onOpen}
      >
        Delete
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Your Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text textStyle="p" mb={4}>This action cannot be undone. This will permanently delete your Churchkey account and sign you out.</Text>

            <Text textStyle="sub">Please type <b>{`churchkey.io/${url}`}</b> to confirm.</Text>

            <FormControl isRequired>
              <Input
                value={confirm}
                onChange={handleChange}
                name="url"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
            border="1px"
            borderColor="#eeeeee"
            colorScheme="red"
            mr={3}
            onClick={handleDelete}
            isDisabled={!(confirm === `churchkey.io/${url}`)}
            isLoading={isLoading}
            >
              Delete
            </Button>
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteAccountModal
