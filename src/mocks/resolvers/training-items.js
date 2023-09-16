import { rest } from 'msw'

const listTraningItem = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      {
        id: 1,
        user_id: 1,
        name: 'ランニング',
        type: 'aerobic', // aerobic, anaerobic
        unit: 'hour', // minute, hour, count, distance
        kcal: 150,
      },
      {
        id: 2,
        user_id: 1,
        name: 'プール',
        type: 'aerobic', // aerobic, anaerobic
        unit: 'minute', // minute, hour, count, distance
        kcal: 5,
      },
    ])
  )
}

const createTraningItem = async (req, res, ctx) => {
  const reqBody = await req.json()
  return res(ctx.status(200), ctx.json(reqBody))
}

const getTraningItem = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      id: req.params.trainingItemId,
      user_id: 1,
      name: 'プール',
      type: 'aerobic', // aerobic, anaerobic
      unit: 'minute', // minute, hour, count, distance
      kcal: 5,
    })
  )
}

const updateTraningItem = async (req, res, ctx) => {
  const reqBody = await req.json()
  return res(ctx.status(200), ctx.json(reqBody))
}

const deleteTraningItem = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({}))
}

const mockTrainingItems = {
  listTraningItem,
  createTraningItem,
  getTraningItem,
  updateTraningItem,
  deleteTraningItem,
}

export default mockTrainingItems
