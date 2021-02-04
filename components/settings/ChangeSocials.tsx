import { ChangeEvent, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { InputGroup, Input, InputLeftAddon, VStack, Box, FormLabel, FormControl, FormHelperText, FormErrorMessage } from '@chakra-ui/react'
import axios from 'axios'

import SettingCard from './SettingCard'
import { Socials } from '../../pages/actions'
import SettingCardBody from './SettingCardBody'
import SettingCardFooter from './SettingCardFooter'
import SettingCardButton from './SettingCardButton'

type ChangeSocialsProps = {
  socials: Socials
}

const ChangeSocials: React.FunctionComponent<ChangeSocialsProps> = ({ socials }) => {
  const [newSocials, setNewSocials] = useState<Socials>(socials)
  const [isLoading, setLoading] = useState(false)
  const [isUnchanged, setUnchanged] = useState(true)
  const [isError, setError] = useState({
    instagram: false,
    twitter: false,
    facebook: false,
    video: false,
    website: false
  })

  const queryClient = useQueryClient()
  const update = useMutation(
    (values: Object) => axios.patch("/api/me", values).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        setLoading(false)
        setUnchanged(true)
      },
      onError: (error) => {
        console.error(error)
        setLoading(false)
      }
    },
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewSocials(prevState => ({
      ...prevState,
      [name]: value
    }))
    setUnchanged(false)
  }

  const validateAll = async () => {
    const instagram = /^$|^[a-zA-Z0-9._]*$/.test(newSocials.instagram)
    const twitter = /^$|^[a-zA-Z0-9._]*$/.test(newSocials.twitter)
    const facebook = /^$|^[a-zA-Z0-9._]*$/.test(newSocials.facebook)
    const video = /^$|(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/.test(newSocials.video)
    const website = /^$|(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/.test(newSocials.website)
    setError({
      instagram: !instagram,
      twitter: !twitter,
      facebook: !facebook,
      video: !video,
      website: !website
    })
    return instagram && twitter && facebook && video && website
      ? true
      : false
  }

  const onSave = async () => {
    setLoading(true)
    const validate = await validateAll()
    if (!validate) {
      setLoading(false)
    }
    else {
      update.mutate({ socials: newSocials })
    }
  }

  return (
    <SettingCard>
      <SettingCardBody
        title="Socials"
        subtitle="Displayed under actions as icons"
      >
        <VStack spacing={8} align="flex-start">
          <Box>
            <FormControl isInvalid={isError.instagram}>
              <FormLabel htmlFor="instagram" fontWeight="medium" letterSpacing="tight">
                Instagram
              </FormLabel>
              <InputGroup>
                <InputLeftAddon
                  children="@"
                  bg="black"
                  color="white"
                  fontWeight="medium"
                />
                <Input
                  name="instagram"
                  isDisabled={isLoading}
                  onChange={handleChange}
                  value={newSocials.instagram}
                />
              </InputGroup>
              <FormErrorMessage>Something doesn't look right!</FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl isInvalid={isError.twitter}>
              <FormLabel htmlFor="twitter" fontWeight="medium" letterSpacing="tight">
                Twitter
              </FormLabel>
              <InputGroup>
                <InputLeftAddon
                  children="@"
                  bg="black"
                  color="white"
                  fontWeight="medium"
                />
                <Input
                  name="twitter"
                  isDisabled={isLoading}
                  onChange={handleChange}
                  value={newSocials.twitter}
                />
              </InputGroup>
              <FormErrorMessage>Something doesn't look right!</FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl isInvalid={isError.facebook}>
              <FormLabel htmlFor="twitter" fontWeight="medium" letterSpacing="tight">
                Facebook
              </FormLabel>
              <InputGroup>
                <InputLeftAddon
                  children="https://facebook.com/"
                  bg="black"
                  color="white"
                  fontWeight="medium"
                />
                <Input
                  name="facebook"
                  isDisabled={isLoading}
                  onChange={handleChange}
                  value={newSocials.facebook}
                />
              </InputGroup>
              <FormErrorMessage>Something doesn't look right!</FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl isInvalid={isError.video}>
              <FormLabel htmlFor="video" fontWeight="medium" letterSpacing="tight">
                Video (Youtube/Vimeo)
              </FormLabel>
              <InputGroup>
                <InputLeftAddon
                  children="https://"
                  bg="black"
                  color="white"
                  fontWeight="medium"
                />
                <Input
                  name="video"
                  isDisabled={isLoading}
                  onChange={handleChange}
                  value={newSocials.video}
                />
              </InputGroup>
              <FormHelperText>URL to your video page or playlist</FormHelperText>
              <FormErrorMessage>Something doesn't look right!</FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl isInvalid={isError.website}>
              <FormLabel htmlFor="video" fontWeight="medium" letterSpacing="tight">
                Website
              </FormLabel>
              <InputGroup>
                <InputLeftAddon
                  children="https://"
                  bg="black"
                  color="white"
                  fontWeight="medium"
                />
                <Input
                  name="website"
                  isDisabled={isLoading}
                  onChange={handleChange}
                  value={newSocials.website}
                />
              </InputGroup>
              <FormHelperText>URL to your website</FormHelperText>
              <FormErrorMessage>Something doesn't look right!</FormErrorMessage>
            </FormControl>
          </Box>
        </VStack>
      </SettingCardBody>
      <SettingCardFooter
        tip="Enter the username/handle/URL for each platform you'd like featured on your page."
      >
        <SettingCardButton
          onClick={onSave}
          isLoading={isLoading}
          isUnchanged={isUnchanged}
        >
          Save
        </SettingCardButton>
      </SettingCardFooter>
    </SettingCard>
  )

}

export default ChangeSocials
