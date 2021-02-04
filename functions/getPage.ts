import { connectToDatabase } from '../utils/mongo'

export const getPage = async ( url: string ) => {
  const { db } = await connectToDatabase()
  const users = db.collection("users")
  const data = await users.findOne({ url: url })

  if (!data) return

  const page = {
    churchName: data.churchName,
    socials: data.socials,
    actions: data.actions,
    colorScheme: data.colorScheme
  }

  return page
}
