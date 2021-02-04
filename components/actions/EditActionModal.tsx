import { ChangeEvent, useState } from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, useDisclosure, FormErrorMessage } from "@chakra-ui/react"
import { FiEdit } from 'react-icons/fi'
import { useMutation, useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ActionProps } from "../../pages/actions"

export type ActionModalProps = {
  action: ActionProps
}

const EditActionModal: React.FunctionComponent<ActionModalProps> = ({ action }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [actionState, setActionState] = useState(action)

  const {
    handleSubmit,
    errors,
    register,
    formState,
    reset
  } = useForm()

  const queryClient = useQueryClient()

  const editAction = useMutation(
    (values: ActionProps) => axios.patch(`/api/actions/${action?.id}`, values).then((res) => res.data),
    {
      onMutate: (values) => {
        let oldActions = queryClient.getQueryData<ActionProps[]>('actions')
        const actionIndex = oldActions?.findIndex((a) => a.id === action?.id)
        if (actionIndex && oldActions) {
          oldActions[actionIndex] = values
        }
        queryClient.setQueryData('actions', oldActions)
      },
      onSuccess: () => {
        queryClient.invalidateQueries('actions')
      }
    }
  )

  const submitHandler = handleSubmit(async (data) => {

    if (!data.url.includes("https://") && !data.url.includes("http://")) {
      data.url = "https://" + data.url
    }

    editAction.mutate({
      id: action.id,
      name: data.name,
      info: data.info,
      url: data.url
    })
    onClose()
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setActionState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleClose = () => {
    onClose()
    setActionState(action)
    reset()
  }

  return (
    <>
      <Button
        size="sm"
        leftIcon={<FiEdit />}
        variant="outline"
        onClick={onOpen}
      >
        Edit
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={submitHandler}>
            <ModalHeader>Add an action</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Action Name</FormLabel>
                <Input
                  isRequired
                  value={actionState?.name}
                  onChange={handleChange}
                  name="name"
                  ref={register({ required: true })}
                  isDisabled={formState.isSubmitting}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Additional Information</FormLabel>
                <Input
                  isRequired
                  value={actionState?.info}
                  onChange={handleChange}
                  name="info"
                  ref={register({ required: true })}
                  isDisabled={formState.isSubmitting}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>URL to Action</FormLabel>
                <Input
                  value={actionState?.url}
                  onChange={handleChange}
                  name="url"
                  ref={register({ required: true })}
                  isDisabled={formState.isSubmitting}
                />
              </FormControl>
              <FormErrorMessage>
                {errors?.url && "Input is required."}
              </FormErrorMessage>
            </ModalBody>

            <ModalFooter>
              <Button
              border="1px"
              borderColor="#eeeeee"
              bg="black" color="white"
              _hover={{ bg: "white", color: "black"}}
              mr={3}
              type="submit"
              isLoading={formState.isSubmitting}
              >
                Save
              </Button>
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditActionModal
