import { Box, Heading, HStack, Link, Flex } from '@chakra-ui/react'
import NextLink from 'next/link'

type HeaderProps = {
  isActionsPage?: boolean
}

const Header: React.FunctionComponent<HeaderProps> = ({ isActionsPage, children }) => {

  return (
    <Box h="20rem" bg="white">
      <Box
        h="50%"
        borderBottom="1px"
        borderColor="#eeeeee"
        textAlign="center"
      >
        <Box mx="auto" maxW="48rem" h="full">
          <Heading textStyle="h1" fontSize="5xl" pt={8}>churchkey.</Heading>
          <HStack spacing={12} justify="center" align="flex-end" h="50%">
            <NextLink href="/actions" passHref>
              <Link
                textStyle="h2"
                fontSize="xl"
                pb={4}
                borderBottom="2px"
                borderColor={isActionsPage ? "black" : "transparent"}
                _hover={{ textDecoration: "none",  }}
                color={isActionsPage ? "black" : "#eeeeee"}
              >
                actions
              </Link>
            </NextLink>
            <NextLink href="/settings" passHref>
              <Link
                textStyle="h2"
                fontSize="xl"
                pb={4}
                borderBottom="2px"
                borderColor={!isActionsPage ? "black" : "transparent"}
                _hover={{ textDecoration: "none",  }}
                color={!isActionsPage ? "black" : "#eeeeee"}
              >
                settings
              </Link>
            </NextLink>
          </HStack>
        </Box>
      </Box>
      <Flex mx="auto" px={8} pb={12} h="50%" maxW="40rem" align="center">
        { children }
      </Flex>
    </Box>
  )
}

export default Header
