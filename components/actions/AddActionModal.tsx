import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, useDisclosure, FormErrorMessage } from "@chakra-ui/react"
import { FiPlus } from 'react-icons/fi'
import { useMutation, useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { ActionProps } from "../../pages/actions"

export type AddActionModalProps = {
  isDisabled?: boolean,
}

const AddActionModal: React.FunctionComponent<AddActionModalProps> = ({ isDisabled }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset
  } = useForm()

  const queryClient = useQueryClient()

  const addAction = useMutation(
    (values: ActionProps) => axios.post(`/api/actions/`, values).then((res) => res.data),
    {
      onMutate: (values) => {
        queryClient.setQueryData('actions', (old: any) => [...old, values])
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

    addAction.mutate({
      id: nanoid(),
      name: data.name,
      info: data.info,
      url: data.url
    })
    onClose()
  })

  return (
    <>
      <Button isDisabled={isDisabled} leftIcon={<FiPlus />} variant="outline" onClick={onOpen}>Add</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose()
          reset()
        }}
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
                  placeholder="Next Step"
                  name="name"
                  {...register("name", { required: true })}
                  isDisabled={isSubmitting}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Additional Information</FormLabel>
                <Input
                  isRequired
                  placeholder="Next Sunday @ 11am"
                  name="info"
                  {...register("info", { required: true })}
                  isDisabled={isSubmitting}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>URL to Action</FormLabel>
                <Input
                  placeholder="https://..."
                  name="url"
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
                Add
              </Button>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddActionModal
