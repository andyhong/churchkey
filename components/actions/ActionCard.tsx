import { Flex, Center, Box, Text, Link, HStack } from "@chakra-ui/react"
import { FiMoreHorizontal } from 'react-icons/fi'
import { Draggable } from 'react-beautiful-dnd'

import { ActionProps } from "../../pages/actions"
import EditActionModal from "./EditActionModal"
import DeleteActionModal from './DeleteActionModal'

export type ActionCardProps = {
  action: ActionProps
  index: number
}


const ActionCard: React.FunctionComponent<ActionCardProps> = ({ action, index }) => (
  <Draggable key={action.id} draggableId={action.id} index={index}>
    {(provided) => (
      <Flex
        mb={4}
        w="full"
        h="9rem"
        bgColor="white"
        rounded="lg"
        shadow="lg"
        direction="column"
        ref={provided.innerRef}
        {...provided.draggableProps}
      >
        <Center
          w="full"
          h="2rem"
          p={4}
          borderBottom="1px"
          borderColor="#eeeeee"
          {...provided.dragHandleProps}
        >
          <FiMoreHorizontal opacity="50%"/>
        </Center>
        <Flex h="full" px={8} py={4} justify="space-between">
          <Box>
            <Text fontWeight="medium" letterSpacing="tight">{ action?.name }</Text>
            <Text letterSpacing="tight">{ action?.info }</Text>
            <Link letterSpacing="tight" textDecor="underline" href={action?.url} isExternal>
              { action?.url }
            </Link>
          </Box>
          <HStack spacing={4}>
            <EditActionModal action={action} />
            <DeleteActionModal action={action} />
          </HStack>
        </Flex>
      </Flex>
    )}
  </Draggable>
)

export default ActionCard
