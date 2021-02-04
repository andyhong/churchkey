import { MouseEvent, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import axios from 'axios'

import SettingCard from './SettingCard'
import { FiChevronDown } from 'react-icons/fi'
import SettingCardBody from './SettingCardBody'
import SettingCardFooter from './SettingCardFooter'

type ChangeColorProps = {
  colorScheme: string
}

const ChangeColor: React.FunctionComponent<ChangeColorProps> = ({ colorScheme }) => {
  // const [newColor, setNewColor] = useState(churchName)
  const [isLoading, setLoading] = useState(false)
  // const [isUnchanged, setUnchanged] = useState(true)

  const queryClient = useQueryClient()
  const update = useMutation(
    (values: Object) => axios.patch("/api/me", values).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        setLoading(false)
      },
      onError: (error) => {
        console.error(error)
        setLoading(false)
      }
    },
  )

  const currentColor = colorScheme === "default" ? "gray.200" : `${colorScheme}.200`

  const colors = ["Default", "Green", "Teal", "Purple", "Cyan", "Red", "Pink", "Orange"]

  const handleChange = (e: MouseEvent<HTMLButtonElement>) => {
    update.mutate({ colorScheme: (e.target as HTMLButtonElement).value })
  }

  return (
    <SettingCard>
      <SettingCardBody
        title="Color Scheme"
        subtitle="Preset color palettes to give your page a pop of color"
      >
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<FiChevronDown />}
            isLoading={isLoading}
            bg={currentColor}
            _hover={{ bg: `${currentColor}`}}
          >
            Select Color
          </MenuButton>
          <MenuList>
            {colors.map(color => (
              <MenuItem key={color} value={color.toLowerCase()} onClick={(e) => handleChange(e)}>
                { color }
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </SettingCardBody>
      <SettingCardFooter tip="We won't judge if you don't love the default colors!" />
    </SettingCard>
  )

}

export default ChangeColor
