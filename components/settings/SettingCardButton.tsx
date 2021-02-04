import { Button } from '@chakra-ui/react'

type SettingCardButtonProps = {
  onClick: () => void,
  isLoading: boolean,
  isUnchanged?: boolean
}

const SettingCardButton: React.FunctionComponent<SettingCardButtonProps> = ({ onClick, isLoading, isUnchanged, children }) => {
  return (
    <Button
      border="1px"
      borderColor="black"
      bg="black" color="white"
      _hover={{ bg: "white", color: "black"}}
      onClick={onClick}
      isLoading={isLoading}
      isDisabled={isUnchanged}
    >
      { children }
    </Button>
  )
}

export default SettingCardButton
