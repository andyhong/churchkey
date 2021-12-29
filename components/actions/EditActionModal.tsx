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

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
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

  const handleClose = () => {
    onClose()
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
            <ModalHeader>Edit an action</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Action Name</FormLabel>
                <Input
                  isRequired
                  defaultValue={action.name}
                  {...register("name", { required: true })}
                  isDisabled={isSubmitting}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Additional Information</FormLabel>
                <Input
                  isRequired
                  defaultValue={action.info}
                  {...register("info", { required: true })}
                  isDisabled={isSubmitting}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>URL to Action</FormLabel>
                <Input
                  defaultValue={action.url}
                  {...register("url", { required: true })}
                  isDisabled={isSubmitting}
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
              isLoading={isSubmitting}
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
