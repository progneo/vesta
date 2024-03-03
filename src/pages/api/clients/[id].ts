import { db } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@prisma/client'

type ResponseData = {
  client: Client | null
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { id } = req.query

  try {
    const existingClientById = await db.client.findUnique({
      include: {
        mother: true,
        father: true,
        Note: true,
        Test: true,
        Appointment: true
      },
      where: { id: Number(id) }
    })
    if (existingClientById) {
      res.status(200).json({ client: existingClientById, message: 'Success' })
    } else {
      res
        .status(404)
        .json({ client: null, message: 'Client with this ID not found' })
    }
  } catch (error) {
    res.status(500).json({ client: null, message: 'Something went wrong' })
  }
}
