import { Box, Heading, Text } from '@chakra-ui/react'

const SettingCardBody: React.FunctionComponent<{
  title?: string,
  subtitle?: string
}> = ({ title, subtitle, children }) => {
  return (
    <Box pt={6} px={6}>
      <Heading fontSize="2xl" letterSpacing="tighter" color="black">{ title }</Heading>
      <Text textStyle="p">{ subtitle }</Text>
      <Box my={8}>
        { children }
      </Box>
    </Box>
  )
}

export default SettingCardBody
