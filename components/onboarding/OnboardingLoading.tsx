import { Flex, Box, Button, Text, Center, Spinner } from '@chakra-ui/react'

const OnboardingLoading: React.FunctionComponent = () => (
  <Flex
    w="full"
    h="16rem"
    bgColor="white"
    rounded="lg"
    shadow="lg"
    direction="column"
  >
    <Box h="95%">
      <Center>
        <Spinner
          thickness="4px"
          speed="0.5s"
          emptyColor="gray.200"
          color="black"
          size="lg"
        />
      </Center>
    </Box>
    <Flex
      borderTop="1px"
      borderColor="#eeeeee"
      px={6}
      justify="space-between"
      align="center"
      h="full"
    >
      <Text textStyle="sub"></Text>
      <Button
        border="1px"
        borderColor="#eeeeee"
        bg="black" color="white"
        _hover={{ bg: "white", color: "black"}}
      >
        Save
      </Button>
    </Flex>
  </Flex>
)

export default OnboardingLoading
