import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import { useQuery } from 'react-query'
import { VStack } from '@chakra-ui/react'
import axios from 'axios'

import Header from '../components/Header'
import Main from '../components/Main'
import SettingHeader from '../components/settings/SettingHeader'
import SettingHeaderLoading from '../components/settings/SettingHeaderLoading'
import ActionLoading from '../components/actions/ActionLoading'
import ChangeUrl from '../components/settings/ChangeUrl'
import ChangeName from '../components/settings/ChangeName'
import ChangeSocials from '../components/settings/ChangeSocials'
import ChangeColor from '../components/settings/ChangeColor'
import DeleteAccount from '../components/settings/DeleteAccount'

import type { User } from './actions'

const Settings: React.FunctionComponent = () => {
  const userQuery = useQuery<User>(
    'user',
    async () => {
      const { data } = await axios.get(`/api/me`)
      return data.me
    }
  )

  if (userQuery.isLoading) {
    return (
      <>
        <Header>
          <SettingHeaderLoading />
        </Header>
        <Main>
          <ActionLoading />
        </Main>
      </>
    )
  }

  return (
    <>
      {typeof(userQuery.data) !== "undefined" &&
      <>
        <Header>
          <SettingHeader name={userQuery.data.name} path={userQuery.data.url}/>
        </Header>
        <Main>
            <VStack spacing={8} w="full">
              <ChangeUrl url={userQuery.data.url} />
              <ChangeName churchName={userQuery.data.churchName} />
              <ChangeSocials socials={userQuery.data.socials} />
              <ChangeColor colorScheme={userQuery.data.colorScheme} />
              <DeleteAccount url={userQuery.data.url} />
            </VStack>

        </Main>
      </>}
    </>
  )
}

export default Settings

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) return {
    redirect : {
      destination: "/login",
      permanent: false
    }
  }

  return {
    props: {}
  }

}
