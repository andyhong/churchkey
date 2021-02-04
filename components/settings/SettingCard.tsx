import { Flex } from "@chakra-ui/react"

const SettingCard: React.FunctionComponent = ({ children }) => (
  <Flex
    w="full"
    minH="15rem"
    bgColor="white"
    rounded="lg"
    shadow="lg"
    direction="column"
  >
    { children }
  </Flex>
)

export default SettingCard
