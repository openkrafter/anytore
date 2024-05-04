import logger from '@/logger'
import trainingRecords from './sampledata/TrainingRecords.json'

const listTraningRecord = (req, res, ctx) => {
  logger.trace('listTraningRecord API Authorization Header')
  logger.trace(req.headers.get('authorization'))
  return res(ctx.status(200), ctx.json(trainingRecords))
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
  return res(ctx.status(200), ctx.json())
}

const mockTrainingRecords = {
  listTraningRecord,
  createTraningRecord,
  getTraningRecord,
  updateTraningRecord,
  deleteTraningRecord,
}

export default mockTrainingRecords
