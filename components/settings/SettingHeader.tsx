import { Flex, Heading, HStack, Button, Link } from '@chakra-ui/react'
import { signOut } from 'next-auth/client'
import { FiLogOut, FiLink } from 'react-icons/fi'

type SettingHeaderProps = {
  name: string
  path: string
}

const SettingHeader: React.FunctionComponent<SettingHeaderProps> = ({ name, path }) => {
  return (
    <Flex w="full" justify="space-between" align="center">
      <Heading textStyle="h2" fontSize="3xl">{ name }</Heading>
      <HStack spacing={4}>
        <Link href={`/${path}`} target="preview">
          <Button leftIcon={<FiLink />} variant="outline">View</Button>
        </Link>
        <Button variant="outline" leftIcon={<FiLogOut />} onClick={() => signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}/` })}>
          Log Out
        </Button>
      </HStack>
    </Flex>
  )
}

export default SettingHeader
