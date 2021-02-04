import { Box, Text, Link } from '@chakra-ui/react'
import { Colors } from '../../pages/[url]'

type PageActionProps = {
  name: string,
  info: string,
  url: string,
  colors: Colors
}

const PageAction: React.FunctionComponent<PageActionProps> = ({ name, info, url, colors }) => {
  return (
    <Link href={url} isExternal _hover={{ textDecoration: "none "}}>
      <Box w="full" p={4} border="3px solid" borderColor={colors.primary} rounded="2xl" shadow="md">
        <Text fontWeight="medium" letterSpacing="tight" color={colors.primary}>
          { name }
        </Text>
        <Text letterSpacing="tight" color={colors.primary}>
          { info }
        </Text>
      </Box>
    </Link>
  )
}

export default PageAction
