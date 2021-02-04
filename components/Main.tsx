import { Flex } from '@chakra-ui/react'

const Main: React.FunctionComponent = ({ children }) => (
  <Flex
    px={8}
    mt={-12}
    pb={24}
    mx="auto"
    maxW="40rem"
    direction="column"
  >
    { children }
  </Flex>
)

export default Main
