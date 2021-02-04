import { ObjectID } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from 'next-auth/jwt'
import { GenericObject } from "next-auth/_utils";

import { connectToDatabase } from "../../../utils/mongo";

const secret: string = process.env.JWT_SECRET!

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query: { id }, body } = req
  const token: GenericObject = await getToken({ req, secret })
  const { db } = await connectToDatabase()
  const users = db.collection("users")
  const userId = new ObjectID(token.id)

  if (!token) {
    res.status(401).json({ message: "You are not authenticated." })
  }

  if (token && method === "PATCH") {
    const updateAction = await users.findOneAndUpdate(
      {
        _id: userId,
        "actions.id": id
      },
      {
        $set: {
          "actions.$": body
        }
      }
    )
    updateAction.lastErrorObject.updatedExisting
      ? res.status(200).json({ success: true, page: updateAction.value})
      : res.status(400).json({ success: false, message: "Something went wrong." })
  }

  if (token && method === "DELETE") {
    const deleteAction = await users.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $pull: {
          actions: { id: body.id }
        }
      }
    )
    deleteAction.lastErrorObject.updatedExisting
      ? res.status(200).json({ success: true, page: deleteAction })
      : res.status(400).json({ success: false, message: "Something went wrong." })
  }
}
