import { db } from '@/lib/db'
import { hash } from 'bcrypt'
import * as z from 'zod'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@prisma/client'

const userSchema = z.object({
  username: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required')
})

type ResponseData = {
  user: User | null
  message: string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { username, password } = userSchema.parse(req.body)

    const existingUserByUsername = await db.user.findUnique({
      where: { username: username }
    })

    if (existingUserByUsername) {
      res
        .status(409)
        .json({ user: null, message: 'User with this username already exists' })
    } else {
      const hashedPassword = await hash(password, 10)
      const newUser = await db.user.create({
        data: {
          username,
          password: hashedPassword,
          isActive: true,
          employeeId: 1,
          roleId: 1
        }
      })

      res
        .status(201)
        .json({ user: newUser, message: 'User created successfully' })
    }
  } catch (error) {
    res.status(500).json({ user: null, message: 'Something went wrong' })
  }
}
