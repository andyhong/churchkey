import { Box, Flex, Heading, VStack } from "@chakra-ui/react"
import { GetServerSideProps } from "next"

import { getPage } from '../functions/getPage'
import PageSocials from '../components/page/PageSocials'
import PageAction from '../components/page/PageAction'

import type { ActionProps, Socials } from '../pages/actions'

type PageProps = {
  churchName: string,
  socials: Socials,
  actions: ActionProps[]
  colorScheme: string
}

export type Colors = {
  primary: string,
  bg: string,
  socials: string
}

const Page: React.FunctionComponent<PageProps> = ({ churchName, socials, actions, colorScheme }) => {

  const colors: Colors = {
    primary: colorScheme === "default" ? "black" : `${colorScheme}.800`,
    bg: colorScheme === "default" ? "#EEEEEE" : `${colorScheme}.100`,
    socials: colorScheme === "default" ? "#DDDDDD" : `${colorScheme}.200`
  }

  return (
    <Box h="100vh" px="2rem" py="8rem" bg={colors.bg}>
      <Flex mx="auto" direction="column" maxW="22rem" align="center">
        <Heading zIndex="2" letterSpacing="tighter" fontSize="3rem" color={colors.primary}>
          { churchName.toLowerCase() }
        </Heading>
        <VStack
          w="full"
          mt={-4}
          p={6}
          direction="column"
          bg="white"
          rounded="3xl"
          shadow="xl"
          spacing={4}
          align="stretch"
        >
          {actions.map(action => (
            <PageAction key={action.id} name={action.name} info={action.info} url={action.url} colors={colors} />
          ))}
        </VStack>
        <PageSocials socials={socials} colors={colors} />
      </Flex>
    </Box>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { url }: any = context.params
  const page = await getPage(url)

  if (!page) return { notFound: true }

  return {
    props: {
      churchName: page.churchName,
      actions: page.actions,
      socials: page.socials,
      colorScheme: page.colorScheme
    }
  }
}
