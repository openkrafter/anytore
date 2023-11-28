import { rest } from 'msw'

const listUsers = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      {
        id: 1,
        name: 'muranaka',
      },
      {
        id: 2,
        name: 'やまだ',
      },
    ])
  )
}

const createUser = async (req, res, ctx) => {
  const reqBody = await req.json()
  return res(ctx.status(200), ctx.json(reqBody))
}

const mockUsers = {
  listUsers,
  createUser,
}

export default mockUsers
