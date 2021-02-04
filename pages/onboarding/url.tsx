import { useState } from 'react'
import { InputGroup, InputLeftAddon, Input, FormControl, FormErrorMessage } from "@chakra-ui/react"
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

import OnboardingLayout from '../../components/onboarding/OnboardingLayout'
import SettingCard from '../../components/settings/SettingCard'
import SettingCardBody from '../../components/settings/SettingCardBody'
import SettingCardFooter from '../../components/settings/SettingCardFooter'
import SettingCardButton from '../../components/settings/SettingCardButton'

const OnboardingUrl: React.FunctionComponent = () => {
  const [url, setUrl] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  const queryClient = useQueryClient()
  const addUrl = useMutation(
    (values: Object) => axios.post("/api/me", values).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        router.push("/onboarding/name")
      },
      onError: (error: any) => {
        setError(true)
        setErrorMessage(error.response.data.message)
        setLoading(false)
      }
    },
  )

  const onSave = () => {
    setLoading(true)
    const validate = /^[a-z0-9_-]{3,16}$/.test(url)
    if (!validate) {
      setError(true)
      setErrorMessage(`Your site path must be an alphanumeric string between 3 and 16 characters.`)
      setLoading(false)
    }
    else {
      setError(false)
      setErrorMessage("")
      addUrl.mutate({ url: url })
    }
  }

  return (
    <OnboardingLayout>
      <SettingCard>
        <SettingCardBody
          title="Let's get you set up."
          subtitle="Decide the page path that where you want your public page to live."
        >
          <FormControl isInvalid={isError}>
            <InputGroup>
              <InputLeftAddon children="https://churchkey.io/" fontWeight="medium" bgColor="black" color="white" borderColor="black"/>
              <Input
                isDisabled={isLoading}
                placeholder="church"
                value={url}
                onChange={(e) => {setUrl(e.target.value)}}
              />
            </InputGroup>
            <FormErrorMessage>{ `⚠️ ${errorMessage}` }</FormErrorMessage>
          </FormControl>
        </SettingCardBody>
        <SettingCardFooter
          tip="We recommend making it something short and sweet."
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

export default OnboardingUrl
