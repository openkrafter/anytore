const listUsers = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      {
        id: 1,
        name: 'user1',
      },
      {
        id: 2,
        name: 'user2',
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
