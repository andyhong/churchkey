import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { Flex } from '@chakra-ui/react'

import Header from '../components/Header'
import ActionHeader from '../components/actions/ActionHeader'
import Main from '../components/Main'
import ActionCard from '../components/actions/ActionCard'
import ActionHeaderLoading from '../components/actions/ActionHeaderLoading'
import ActionLoading from '../components/actions/ActionLoading'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

export type ActionProps = {
  id: string,
  name: string,
  info: string,
  url: string
}

export type User = {
  name: string,
  email: string,
  image: string,
  url: string,
  churchName: string,
  socials: Socials,
  colorScheme: string
}

export type Socials = {
  [key: string]: string,
  instagram: string,
  twitter: string,
  facebook: string,
  video: string,
  website: string
}

const Actions: React.FunctionComponent = () => {
  const queryClient = useQueryClient()

  const userQuery = useQuery<User>(
    'user',
    async () => {
      const { data } = await axios.get(`/api/me`)
      return data.me
    }
  )

  const actionsQuery = useQuery(
    'actions',
    async () => {
      const { data } =  await axios.get(`/api/actions`)
      return data.actions
    }
  )

  const reorderActions = useMutation(
    (values: any) => axios.patch(`/api/actions`, values).then((res) => res.data),
    {
      onMutate: (values) => {
        const { actions } = values
        queryClient.setQueryData('actions', actions)
      },
      onSuccess: () => {
        queryClient.invalidateQueries('actions')
      }
    }
  )

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return

    const newActions = Array.from(actionsQuery.data)
    newActions.splice(source.index, 1)
    newActions.splice(destination.index, 0, actionsQuery.data[source.index])
    console.log(newActions)
    reorderActions.mutate({ actions: newActions })

  }

  return (
    <>
      <Header isActionsPage>
        {userQuery.isLoading
          ? (<ActionHeaderLoading />)
          : (<ActionHeader path={userQuery.data?.url}/>)
        }
      </Header>
      {actionsQuery.isLoading
        ? (<Main>
            <ActionLoading />
          </Main>
        )
        : (<DragDropContext onDragEnd={onDragEnd}>
            <Main>
              <Droppable droppableId="actions">
                {(provided) => (
                  <Flex
                    as="div"
                    direction="column"
                    w="full"
                    h="full"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {actionsQuery.data.map((action: ActionProps, index: number) => (
                      <ActionCard
                        key={action.id}
                        action={action}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </Flex>
                )}
              </Droppable>
            </Main>
          </DragDropContext>
        )
      }
    </>
  )
}

export default Actions

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) return {
    redirect : {
      destination: "/",
      permanent: false
    }
  }

  return {
    props: {}
  }

}
