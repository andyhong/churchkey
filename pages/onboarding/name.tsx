import { useState } from 'react'
import { InputGroup, Input, FormControl, FormErrorMessage } from "@chakra-ui/react"
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'

import OnboardingLayout from '../../components/onboarding/OnboardingLayout'
import SettingCard from '../../components/settings/SettingCard'
import axios from 'axios'
import SettingCardBody from '../../components/settings/SettingCardBody'
import SettingCardFooter from '../../components/settings/SettingCardFooter'
import SettingCardButton from '../../components/settings/SettingCardButton'

const OnboardingName = () => {
  const [name, setName] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()
  const queryClient = useQueryClient()

  const update = useMutation(
    (values: Object) => axios.patch("/api/me", values).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        router.push("/onboarding/socials")
      },
      onError: (error) => {
        console.error(error)
        setLoading(false)
      }
    }
  )

  const onSave = () => {
    setLoading(true)
    const validate = /^[a-zA-Z0-9 ]*$/.test(name)
    if (!validate) {
      setError(true)
      setErrorMessage(`⚠️ Your church name can only contain letters, numbers, and spaces!`)
      setLoading(false)
    }
    else {
      setError(false)
      setErrorMessage("")
      update.mutate({ churchName: name })
    }
  }

  return (
    <OnboardingLayout>
      <SettingCard>
        <SettingCardBody
          title="What's your church's name?"
          subtitle="This will be displayed loud and proud at the top of your page."
        >
          <FormControl isInvalid={isError}>
            <InputGroup>
              <Input
                placeholder="First Church"
                value={name}
                onChange={(e) => {setName(e.target.value)}}
                isDisabled={isLoading}
              />
            </InputGroup>
            <FormErrorMessage>{ errorMessage }</FormErrorMessage>
          </FormControl>
        </SettingCardBody>
        <SettingCardFooter
          tip="Tip — it looks better if you shorten your name by excluding the word “church”."
        >
          <SettingCardButton
            onClick={onSave}
            isLoading={isLoading}
          >
            Save
          </SettingCardButton>
        </SettingCardFooter>
      </SettingCard>
    </OnboardingLayout>
  )
}

export default OnboardingName
