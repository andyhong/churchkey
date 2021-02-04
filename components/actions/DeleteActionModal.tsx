import { useRef } from 'react'
import { Button, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, useDisclosure } from '@chakra-ui/react'
import { FiTrash2 } from 'react-icons/fi'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

import type { ActionModalProps } from './EditActionModal'
import type { ActionProps } from "../../pages/actions"

const DeleteActionModal: React.FunctionComponent<ActionModalProps> = ({ action }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  const queryClient = useQueryClient()
  const deleteAction = useMutation(
    (values: { id: string }) => axios.delete(`/api/actions/${action.id}`, { data: values }),
    {
      onMutate: (values) => {
        const oldActions = queryClient.getQueryData<ActionProps[]>('actions')
        queryClient.setQueryData(
          'actions',
          oldActions?.filter(a => a.id !== values.id)
        )
      },
      onSuccess: () => {
        queryClient.invalidateQueries('actions')
      },
    }
  )

  const deleteHandler = () => {
    deleteAction.mutate({
      id: action.id
    })
  }

  return (
    <>
      <Button
        size="sm"
        bg="black"
        color="white"
        colorScheme="red"
        leftIcon={<FiTrash2 />}
        onClick={onOpen}
      >
        Delete
      </Button>

      <AlertDialog
        motionPreset="slideInRight"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="medium"
              letterSpacing="tight"
            >
              Delete {action ? action.name : "Action"}
            </AlertDialogHeader>

            <AlertDialogBody textStyle="p">
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme="red"
                onClick={deleteHandler}
              >
                Delete
              </Button>
              <Button ref={cancelRef} onClick={onClose} ml={3}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteActionModal
