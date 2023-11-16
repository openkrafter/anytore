import { rest } from 'msw'

const listTraningRecord = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      {
        id: 1,
        userId: 1,
        trainingItemId: 1,
        record: 2,
        date: 1697723834,
      },
      {
        id: 2,
        userId: 1,
        trainingItemId: 2,
        record: 30,
        date: 1697810234,
      },
      {
        id: 3,
        userId: 1,
        trainingItemId: 3,
        record: 45,
        date: 1697846234,
      },
    ])
  )
}

const createTraningRecord = async (req, res, ctx) => {
  const reqBody = await req.json()
  return res(ctx.status(200), ctx.json(reqBody))
}

const getTraningRecord = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      id: req.params.trainingItemId,
      userId: 1,
      trainingItemId: 1,
      record: 2,
      date: 1697723834,
    })
  )
}

const updateTraningRecord = async (req, res, ctx) => {
  const reqBody = await req.json()
  return res(ctx.status(200), ctx.json(reqBody))
}

const deleteTraningRecord = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({}))
}

const mockTrainingRecords = {
  listTraningRecord,
  createTraningRecord,
  getTraningRecord,
  updateTraningRecord,
  deleteTraningRecord,
}

export default mockTrainingRecords
