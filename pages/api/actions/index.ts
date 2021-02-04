import { NextApiRequest, NextApiResponse } from "next";
import { ObjectID } from "mongodb";
import { getToken } from 'next-auth/jwt'
import { GenericObject } from "next-auth/_utils";

import { connectToDatabase } from "../../../utils/mongo";
import { useMergeRefs } from "@chakra-ui/react";

const secret: string = process.env.JWT_SECRET!

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const token: GenericObject = await getToken({ req, secret })
  const { db } = await connectToDatabase()
  const users = db.collection("users")
  const userId = new ObjectID(token.id)

  if (!token) {
    res.status(401).json({ message: "You are not authenticated." })
  }

  if (token && method === "GET") {
    const user = await users.findOne({ _id: userId })
    user
      ? res.status(200).json({ success: true, actions: user.actions })
      : res.status(400).json({ success: false, message: "Something went wrong." })
  }

  if (token && method === "POST") {
    const { body } = req
    const update = await users.findOneAndUpdate(
      {
        _id: userId
      },
      {
        $push: {
          "actions": body
        }
      }
    )
    update.lastErrorObject.updatedExisting
      ? res.status(200).json({ success: true, actions: update.value})
      : res.status(400).json({ success: false, message: "Something went wrong." })
  }

  if (token && method === "PATCH") {
    const { body: { actions } } = req
    const update = await users.findOneAndUpdate(
      {
        _id: userId
      },
      {
        $set: {
          "actions": actions
        }
      }
    )
    update.lastErrorObject.updatedExisting
      ? res.status(200).json({ success: true, actions: update.value })
      : res.status(400).json({ success: false, message:"Something went wrong." })
  }
}
