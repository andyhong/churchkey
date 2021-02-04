import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react'
import { signIn } from 'next-auth/client'

const Home: React.FunctionComponent = () => {
  return (
    <Box minH="100vh" bgColor="white">
      <Flex
        maxW="48rem"
        w="full"
        m="auto"
        py="6rem"
        px="3rem"
        direction="column"
        justify="center"
        align="center"
        >
        <Flex
          mb={12}
          w="full"
          direction="column"
          justify="center"
          align="center"
          >
          <Heading textStyle="h2">Say hello 👋 to your church’s</Heading>
          <Heading textStyle="h1" bgClip="text" bgGradient="linear(to-r, #36D1DC,#5B86E5)">online bulletin</Heading>
          <Heading textStyle="h1" ml={12} mr="auto" bgClip="text" bgGradient="linear(to-r, #11998e,#38ef7d)">digital front door</Heading>
          <Heading textStyle="h1" ml="auto" mr={8} bgClip="text" bgGradient="linear(to-r, #0cebeb,#20e3b2,#29ffc6)">ministry resource hub</Heading>
        </Flex>
        <Box mb={8}>
          <Text mb={8} textStyle="p" fontWeight="medium" fontSize="xl">
            Churchkey is a simple, easy to use solution that helps your church take a next step with just one click.
          </Text>
          <Text mb={8} textStyle="p" fontWeight="medium" fontSize="xl">
            Our minimal and intentional design allows for flexibility in how you choose to use your page — you can spotlight a next step, link to other resources, or simply have a place for all your social media accounts to live.
          </Text>
          <Text mb={8} textStyle="p" fontWeight="medium" fontSize="xl">
            It’s free, and takes less than a minute to get started. The best part of all? Your church is going to love it.
          </Text>
        </Box>
        <Button
          border="1px"
          borderColor="black"
          _hover={{ bg: "white", color: "black"}}
          bg="black" color="white"
          onClick={() => signIn()}
        >
          Get Started &rarr;
        </Button>
      </Flex>
    </Box>
  )
}

export default Home
