import { db } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@prisma/client'

type ResponseData = {
  clientList: Client[] | null
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const firstName = req.query['firstName']?.at(0)
    const lastName = req.query['lastName']?.at(0)
    const patronymic = req.query['patronymic']?.at(0)

    const existingClients = await db.client.findMany({
      where: {
        firstName: {
          contains: firstName ?? '',
          mode: 'insensitive'
        },
        lastName: {
          contains: lastName ?? '',
          mode: 'insensitive'
        },
        patronymic: {
          contains: patronymic ?? '',
          mode: 'insensitive'
        }
      }
    })

    if (existingClients) {
      res.status(200).json({ clientList: existingClients, message: 'Success' })
    } else {
      res.status(404).json({ clientList: null, message: 'Clients not found' })
    }
  } catch (error) {
    res.status(500).json({ clientList: null, message: 'Something went wrong' })
  }
}
