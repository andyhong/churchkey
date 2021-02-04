import { Flex, HStack, Text } from '@chakra-ui/react'

const SettingCardFooter: React.FunctionComponent<{ tip?: string }> = ({ tip, children }) => {
  return (
    <Flex
      borderTop="1px"
      borderColor="#eeeeee"
      px={6}
      py={4}
      justify="space-between"
      align="center"
      h="full"
    >
      <Text textStyle="sub" mr={2}>{ tip }</Text>
      <HStack spacing={4}>
        { children }
      </HStack>
    </Flex>
  )
}

export default SettingCardFooter
