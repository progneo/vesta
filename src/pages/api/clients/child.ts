import { z } from 'zod'
import { Client, Father, Mother } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db'

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  patronymic: z.string().min(1, 'Patronymic is required'),
  address: z.string().min(1, 'Address is required'),
  identityDocument: z.string().min(10, 'Passport is required'),
  motherId: z.number(),
  fatherId: z.number()
})

type ResponseData = {
  client: Client | null
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const {
      firstName,
      lastName,
      patronymic,
      address,
      identityDocument,
      motherId,
      fatherId
    } = schema.parse(req.body)

    const birthDate = new Date()
    const newClient = await db.client.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        patronymic: patronymic,
        birthDate: birthDate,
        gender: 'М',
        address: address,
        identityDocument: identityDocument,
        motherId: motherId,
        fatherId: fatherId
      }
    })

    res
      .status(201)
      .json({ client: newClient, message: 'Client created successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ client: null, message: 'Something went wrong' })
  }
}
