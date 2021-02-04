import { Flex, Heading, HStack, Button, Link } from '@chakra-ui/react'
import { FiLink } from 'react-icons/fi'

import AddActionModal from './AddActionModal'

type ActionHeaderProps = {
  path?: string
}

const ActionHeader: React.FunctionComponent<ActionHeaderProps> = ({ path }) => (
  <Flex w="full" justify="space-between" align="center">
      <Heading textStyle="h2" fontSize="3xl">{ `/${path}` }</Heading>
      <HStack spacing={4}>
        <AddActionModal />
        <Link href={`/${path}`} target="preview">
          <Button leftIcon={<FiLink />} variant="outline">View</Button>
        </Link>
      </HStack>
  </Flex>
)

export default ActionHeader
