import { ChangeEvent, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { InputGroup, InputLeftAddon, Input, Text, Button, FormControl, FormErrorMessage } from '@chakra-ui/react'
import axios from 'axios'

import SettingCard from './SettingCard'
import SettingCardBody from './SettingCardBody'
import SettingCardFooter from './SettingCardFooter'
import SettingCardButton from './SettingCardButton'

type ChangeUrlProps = {
  url: string
}

const ChangeUrl: React.FunctionComponent<ChangeUrlProps> = ({ url }) => {
  const [newUrl, setNewUrl] = useState(url)
  const [isLoading, setLoading] = useState(false)
  const [isUnchanged, setUnchanged] = useState(true)
  const [isError, setError ] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

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
    setNewUrl(e.target.value)
    setUnchanged(false)
  }

  const onSave = () => {
    setLoading(true)
    const validate = /^[a-z0-9_-]{3,16}$/.test(newUrl)
    if (!validate) {
      setError(true)
      setErrorMessage(`⚠️ Your site path must be an alphanumeric string between 3 and 16 characters.`)
      setLoading(false)
    }
    else {
      setError(false)
      setErrorMessage("")
      update.mutate({ url: newUrl })
    }
  }

  return (
    <SettingCard>
      <SettingCardBody
        title="Site Path"
        subtitle="URL to your public page"
      >
        <FormControl isInvalid={isError}>
          <InputGroup>
            <InputLeftAddon children={`${process.env.NEXT_PUBLIC_URL}/`} fontWeight="medium" bgColor="black" color="white" borderColor="black"/>
            <Input
              isDisabled={isLoading}
              value={newUrl}
              onChange={handleChange}
            />
          </InputGroup>
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
      </SettingCardBody>
      <SettingCardFooter tip="We recommend making it something short and sweet.">
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

export default ChangeUrl
