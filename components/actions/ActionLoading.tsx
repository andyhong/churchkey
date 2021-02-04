import { Flex, Center, Spinner } from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'

const ActionLoading: React.FunctionComponent = () => (
  <Flex
    w="full"
    h="9rem"
    bgColor="white"
    rounded="lg"
    shadow="lg"
    direction="column"
  >
    <Center w="full" h="2rem" borderBottom="1px" borderColor="#eeeeee">
      <FiMoreHorizontal />
    </Center>
    <Center h="full">
      <Spinner
        thickness="4px"
        speed="0.5s"
        emptyColor="gray.200"
        color="black"
        size="lg"
      />
    </Center>
  </Flex>
)

export default ActionLoading
