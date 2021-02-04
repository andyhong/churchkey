import { Flex, Heading, HStack, Button, Link } from '@chakra-ui/react'
import { signOut } from 'next-auth/client'
import { FiLogOut } from 'react-icons/fi'
import { BeatLoader } from 'react-spinners'

const SettingHeaderLoading: React.FunctionComponent = () => {
  return (
    <Flex w="full" justify="space-between" align="center">
      <BeatLoader color="#eeeeee" />
      <Button isDisabled variant="outline" leftIcon={<FiLogOut />} onClick={() => signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}/` })}>
        Log Out
      </Button>
    </Flex>
  )
}

export default SettingHeaderLoading
