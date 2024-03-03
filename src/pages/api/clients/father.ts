import { z } from 'zod'
import { Father, Mother } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db'

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  patronymic: z.string().min(1, 'Patronymic is required'),
  phone: z.string().min(10, 'Phone is required'),
  identityDocument: z.string().min(10, 'Passport is required')
})

type ResponseData = {
  father: Father | null
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { firstName, lastName, patronymic, phone, identityDocument } =
      schema.parse(req.body)

    const newFather = await db.father.create({
      data: {
        firstName,
        lastName,
        patronymic,
        phone,
        identityDocument
      }
    })

    res
      .status(201)
      .json({ father: newFather, message: 'Father created successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ father: null, message: 'Something went wrong' })
  }
}
