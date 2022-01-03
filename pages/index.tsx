import { Box, Flex, Heading, Text, Button, Link, flexbox } from '@chakra-ui/react'
import Typist from "react-typist"
import { signIn } from 'next-auth/react'

const Home2: React.FunctionComponent = () => {
  return (
    <Box minH="100vh">
      <Flex minH="25rem" h="full" bgColor="#111111" align="center" justify="center" p={8} direction="column">
        <Box maxW="48rem" w="full" textAlign="right" mb={2}>
          <Link onClick={() => signIn()} fontSize="lg" letterSpacing="tight" color="white">Login&rarr;</Link>
        </Box>
        <Flex minH="20rem" maxW="48rem" w="full" border="white 1px solid" borderRadius={4} py={12} px={16} align="center">
          <Heading color="white" size="xl" letterSpacing="tighter" lineHeight="tall">
            <Typist>
                churchkey.
                <Typist.Delay ms={2000} />
                <br />
                say hello to your church's
                <br />
                online bulletin.
                <Typist.Backspace count={16} delay={1000} />
                ministry resource hub.
                <Typist.Backspace count={22} delay={1000} />
                digital front door.
            </Typist>
          </Heading>
        </Flex>
      </Flex>
      <Flex direction="column" maxW="48rem" margin="auto" p={8}>
        <Text fontSize="xl" letterSpacing="tight" mb={8}>
          Churchkey is a simple, easy to use solution that helps your church take a next step with just one click.
        </Text>
        <Text fontSize="xl" letterSpacing="tight" mb={8}>
          Our minimal and intentional design allows for flexibility in how you choose to use your page — you can spotlight a next step, link to other resources, or simply have a place for all your social media accounts to live.
        </Text>
        <Text fontSize="xl" letterSpacing="tight" mb={8}>
          It’s free, and takes less than a minute to get started. The best part of all? Your church is going to love it.
        </Text>
        <Link href="/sample" mr="auto" mb={8} fontSize="xl" fontWeight="medium" letterSpacing="tight">Take a look at a sample&rarr;</Link>
        <Button onClick={() => signIn()} variant="outline" mr="auto" colorScheme="blackAlpha" color="black" size="lg" _hover={{ bg:"#111111", color:"white" }}>Get Started&rarr;</Button>
      </Flex>
    </Box>
  )
}

export default Home2