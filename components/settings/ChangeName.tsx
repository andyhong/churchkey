import { ChangeEvent, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { InputGroup, Input, Button, FormControl, FormErrorMessage } from '@chakra-ui/react'
import axios from 'axios'

import SettingCard from './SettingCard'
import SettingCardBody from './SettingCardBody'
import SettingCardFooter from './SettingCardFooter'
import SettingCardButton from './SettingCardButton'

type ChangeNameProps = {
  churchName: string
}

const ChangeName: React.FunctionComponent<ChangeNameProps> = ({ churchName }) => {
  const [newChurchName, setNewChurchName] = useState(churchName)
  const [isLoading, setLoading] = useState(false)
  const [isUnchanged, setUnchanged] = useState(true)
  const [isError, setError] = useState(false)
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
    setNewChurchName(e.target.value)
    setUnchanged(false)
  }

  const onSave = () => {
    setLoading(true)
    const validate = /^[a-zA-Z0-9 ]*$/.test(newChurchName)
    if (!validate) {
      setError(true)
      setErrorMessage(`⚠️ Your church name can only contain letters, numbers, and spaces!`)
      setLoading(false)
    }
    else {
      setError(false)
      setErrorMessage("")
      update.mutate({ churchName: newChurchName })
    }
  }

  return (
    <SettingCard>
      <SettingCardBody
        title="Church Name"
        subtitle="Displayed at the top of your page"
      >
        <FormControl isInvalid={isError}>
          <InputGroup>
            <Input
              value={newChurchName}
              onChange={handleChange}
              isDisabled={isLoading}
            />
          </InputGroup>
          <FormErrorMessage>{ errorMessage }</FormErrorMessage>
        </FormControl>
      </SettingCardBody>
      <SettingCardFooter
        tip="Tip — it looks better if you shorten your name by excluding the word “church”"
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

export default ChangeName
