import { Flex, Heading, HStack, Button, Skeleton } from '@chakra-ui/react'
import { FiLink, FiCheck } from 'react-icons/fi'
import { BeatLoader } from 'react-spinners'

import AddActionModal from './AddActionModal'

const ActionHeaderLoading: React.FunctionComponent = () => (
  <Flex w="full" justify="space-between" align="center">
      <BeatLoader color="#eeeeee" />
      <HStack spacing={4}>
        <AddActionModal isDisabled/>
        <Button isDisabled leftIcon={<FiLink />} variant="outline">View</Button>
      </HStack>
  </Flex>
)

export default ActionHeaderLoading
