import { MongoClient, Db, ConnectOptions } from 'mongodb'

const mongoUri: string = process.env.MONGO_URI!
const mongoDb: string = process.env.MONGO_DB!

if (!mongoUri) throw new Error('Missing env variable MONGO_URI')
if (!mongoDb) throw new Error('Missing env variable MONGO_DB')

let cachedMongoClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  if (cachedMongoClient && cachedDb) return {
    client: cachedMongoClient, db: cachedDb
  }

  const client = await MongoClient.connect(
    mongoUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions
  )

  const db = client.db(mongoDb)

  cachedMongoClient = client
  cachedDb = db

  return { client, db }
}
