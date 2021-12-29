import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from 'next-auth/jwt'
import { nanoid } from 'nanoid'
import { ObjectId } from "mongodb";

import { connectToDatabase } from "../../../utils/mongo";

const secret: string = process.env.JWT_SECRET!

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const token = await getToken({ req, secret })
  const { db } = await connectToDatabase()
  const users = db.collection("users")
  const userId = new ObjectId(token.sub)

  if (!token) {
    res.status(401).json({ message: "You are not authenticated." })
  }

  if (token && method === "GET") {
    const user = await users.findOne({ _id: userId })
    const me = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      url: user.url,
      churchName: user.churchName,
      socials: user.socials,
      colorScheme: user.colorScheme
    }
    user
      ? res.status(200).json({ success: true, me: me })
      : res.status(400).json({ success: false, message: "Something went wrong." })
  }

  if (token && method === "POST") {
    const { body } = req
    const user = await users.findOne(body)
    if (user === null) {
      const update = await users.findOneAndUpdate(
        {
          _id: userId
        },
        {
          $set: {
            url: body.url,
            churchName: "",
            actions: [{
              id: nanoid(),
              name: "Your First Action",
              info: "Edit this with the button to the right!",
              url: "https://churchkey.io/actions"
            }],
            socials: {
              instagram: '',
              twitter: '',
              facebook: '',
              video: '',
              website: ''
            },
            colorScheme: "default"
          }
        }
      )
      update.lastErrorObject.updatedExisting
        ? res.status(200).json({ success: true, update: update.value })
        : res.status(400).json({ success: false, message: "Something went wrong." })
    } else {
      res.status(400).json({ success: false, message: "URL already exists. Please choose another." })
    }
  }

  if (token && method === "PATCH") {
    const { body } = req
    const update = await users.findOneAndUpdate(
      {
        _id: userId
      },
      {
        $set: body
      }
    )
    update.lastErrorObject.updatedExisting
      ? res.status(200).json({ success: true, update: update.value })
      : res.status(400).json({ success: false, message: "Something went wrong." })
  }

  if (token && method === "DELETE") {
    const deleteUser = await users.findOneAndDelete({ _id: userId })
    const deleteAccount = await db.collection("accounts").findOneAndDelete({ userId: userId })
    deleteUser && deleteAccount
      ? res.status(200).json({ success: true, user: deleteUser })
      : res.status(400).json({ success: false, message: "Something went wrong." })
  }
}
