import { Box, Center, Heading } from '@chakra-ui/react'
import Main from '../Main'

const OnboardingLayout: React.FunctionComponent = ({ children }) => (
  <>
    <Box h="20rem" bg="white">
      <Center h="full">
        <Heading textStyle="h1" textAlign="center">
          welcome to <br /> churchkey.
        </Heading>
      </Center>
    </Box>
    <Main>
      { children }
    </Main>
  </>
)

export default OnboardingLayout
