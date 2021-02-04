import { useRouter } from 'next/router'
import { signIn, getSession } from 'next-auth/client'
import { Box, Flex, Heading, Text, Button, VStack, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'

import Main from '../components/Main'

const Login: React.FunctionComponent = () => {
  const router = useRouter()
  const { query: { error } } = router

  const handleLogin = (provider: string) => {
    signIn(provider, { callbackUrl: `${process.env.NEXT_PUBLIC_URL}/actions`})
  }

  return (
    <>
      <Flex h="20rem" bg="white" direction="column" justify="center" align="center">
        <Box py={4} mx="auto">
          <Heading textStyle="h1" textAlign="center">
            login to <br /> churchkey.
          </Heading>
          {error === "OAuthAccountNotLinked" &&
            <Alert status="error" mt={6} rounded="xl" >
              <AlertIcon />
              <AlertDescription textStyle="sub" >
                Your email address is already associated with another provider. Please use the same provider to log in.
              </AlertDescription>
            </Alert>
          }
        </Box>
      </Flex>
      <Main>
        <VStack mx="auto" maxW="24rem" bg="white" p={8} spacing={4} rounded="3xl" shadow="xl" align="stretch">
          <Text letterSpacing="tight" fontWeight="medium">Please select a login provider:</Text>
          <Button border="1px" borderColor="#EA4335" bg="#EA4335" color="white" _hover={{ bg: "white", color: "#EA4335" }} onClick={() => handleLogin("google")}>
            Continue with Google
          </Button>
          <Button border="1px" borderColor="#1DA1F2" bg="#1DA1F2" color="white" _hover={{ bg: "white", color: "#1DA1F2" }} onClick={() => handleLogin("twitter")}>
            Continue with Twitter
          </Button>
          <Button border="1px" borderColor="#1778F2" bg="#1778F2" color="white" _hover={{ bg: "white", color: "#1778F2" }} onClick={() => handleLogin("facebook")}>
            Continue with Facebook
          </Button>
          <Button isDisabled>
            Continue with Github
          </Button>
        </VStack>
      </Main>
    </>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) return {
    redirect : {
      destination: "/actions",
      permanent: false
    }
  }

  return {
    props: {}
  }

}
