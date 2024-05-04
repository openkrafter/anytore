import logger from '@/logger'
// import { rest } from 'msw'

const listTraningItem = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      {
        id: 1,
        userId: 1,
        name: 'ランニング',
        type: 'aerobic', // aerobic, anaerobic
        unit: 'hour', // minute, hour, count, distance
        kcal: 150,
      },
      {
        id: 2,
        userId: 1,
        name: 'プール',
        type: 'aerobic', // aerobic, anaerobic
        unit: 'minute', // minute, hour, count, distance
        kcal: 5,
      },
      {
        id: 3,
        userId: 1,
        name: 'ウォーキング',
        type: 'aerobic', // aerobic, anaerobic
        unit: 'minute', // minute, hour, count, distance
        kcal: 2,
      },
      {
        id: 4,
        userId: 1,
        name: '腕立て',
        type: 'anaerobic', // aerobic, anaerobic
        unit: 'count', // minute, hour, count, distance
        kcal: 1,
      },
    ])
  )
}

const createTraningItem = async (req, res, ctx) => {
  logger.trace('createTraningItem API Authorization Header')
  logger.trace(req.headers.get('authorization'))
  const reqBody = await req.json()
  return res(ctx.status(200), ctx.json(reqBody))
}

const getTraningItem = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      id: req.params.trainingItemId,
      userId: 1,
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
  logger.trace('deleteTraningItem API Authorization Header')
  logger.trace(req.headers.get('authorization'))
  return res(ctx.status(200), ctx.json())
}

const mockTrainingItems = {
  listTraningItem,
  createTraningItem,
  getTraningItem,
  updateTraningItem,
  deleteTraningItem,
}

export default mockTrainingItems
