import { Flex, Box, Text, Heading, HStack } from "@chakra-ui/react"

import DeleteAccountModal from './DeleteAccountModal'

type DeleteAccountProps = {
  url: string
}

const DeleteAccount: React.FunctionComponent<DeleteAccountProps> = ({ url, children }) => (
  <Flex
    w="full"
    minH="10rem"
    bgColor="black"
    rounded="lg"
    shadow="lg"
    direction="column"
  >
    <Box p={6}>
      <Heading fontSize="2xl" letterSpacing="tighter" color="white">Delete Account</Heading>
    </Box>
    <Flex
      borderTop="1px"
      borderColor="#eeeeee"
      px={6}
      py={4}
      justify="space-between"
      align="center"
      flex="1"
    >
      <Text textStyle="sub" color="white">We're sad to see you go! All your account details will be deleted permanently.</Text>
        <HStack spacing={4} ml={4}>
          <DeleteAccountModal url={url} />
        </HStack>
    </Flex>
  </Flex>
)

export default DeleteAccount
