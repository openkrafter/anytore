import { rest } from 'msw'
import trainingRecords from './sampledata/TrainingRecords.json'

const listTraningRecord = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json(trainingRecords)
    // ctx.json([
    //   {
    //     id: 1,
    //     userId: 1,
    //     trainingItemId: 1,
    //     record: 2,
    //     date: 1697723834,
    //   },
    //   {
    //     id: 2,
    //     userId: 1,
    //     trainingItemId: 2,
    //     record: 30,
    //     date: 1697810234,
    //   },
    //   {
    //     id: 3,
    //     userId: 1,
    //     trainingItemId: 3,
    //     record: 45,
    //     date: 1697846234,
    //   },
    //   {
    //     id: 4,
    //     userId: 1,
    //     trainingItemId: 4,
    //     record: 10,
    //     date: 1697846945,
    //   },
    //   {
    //     id: 5,
    //     userId: 1,
    //     trainingItemId: 1,
    //     record: 4,
    //     date: 1697823834,
    //   },
    //   {
    //     id: 6,
    //     userId: 1,
    //     trainingItemId: 2,
    //     record: 32,
    //     date: 1697910234,
    //   },
    //   {
    //     id: 7,
    //     userId: 1,
    //     trainingItemId: 3,
    //     record: 47,
    //     date: 1697946234,
    //   },
    //   {
    //     id: 8,
    //     userId: 1,
    //     trainingItemId: 4,
    //     record: 12,
    //     date: 1697946945,
    //   },
    //   {
    //     id: 9,
    //     userId: 1,
    //     trainingItemId: 1,
    //     record: 6,
    //     date: 1697923834,
    //   },
    //   {
    //     id: 10,
    //     userId: 1,
    //     trainingItemId: 2,
    //     record: 34,
    //     date: 1698010234,
    //   },
    //   {
    //     id: 11,
    //     userId: 1,
    //     trainingItemId: 3,
    //     record: 49,
    //     date: 1698046234,
    //   },
    //   {
    //     id: 12,
    //     userId: 1,
    //     trainingItemId: 4,
    //     record: 14,
    //     date: 1698046945,
    //   },
    //   {
    //     id: 13,
    //     userId: 1,
    //     trainingItemId: 1,
    //     record: 8,
    //     date: 1698023834,
    //   },
    //   {
    //     id: 14,
    //     userId: 1,
    //     trainingItemId: 2,
    //     record: 36,
    //     date: 1698110234,
    //   },
    //   {
    //     id: 15,
    //     userId: 1,
    //     trainingItemId: 3,
    //     record: 51,
    //     date: 1698146234,
    //   },
    //   {
    //     id: 16,
    //     userId: 1,
    //     trainingItemId: 4,
    //     record: 16,
    //     date: 1698146945,
    //   },
    //   {
    //     id: 17,
    //     userId: 1,
    //     trainingItemId: 1,
    //     record: 10,
    //     date: 1698123834,
    //   },
    //   {
    //     id: 18,
    //     userId: 1,
    //     trainingItemId: 2,
    //     record: 38,
    //     date: 1698210234,
    //   },
    //   {
    //     id: 19,
    //     userId: 1,
    //     trainingItemId: 3,
    //     record: 53,
    //     date: 1698246234,
    //   },
    //   {
    //     id: 20,
    //     userId: 1,
    //     trainingItemId: 4,
    //     record: 18,
    //     date: 1698246945,
    //   },
    //   {
    //     id: 21,
    //     userId: 1,
    //     trainingItemId: 1,
    //     record: 12,
    //     date: 1698223834,
    //   },
    //   {
    //     id: 22,
    //     userId: 1,
    //     trainingItemId: 2,
    //     record: 40,
    //     date: 1698310234,
    //   },
    //   {
    //     id: 23,
    //     userId: 1,
    //     trainingItemId: 3,
    //     record: 55,
    //     date: 1698346234,
    //   },
    //   {
    //     id: 24,
    //     userId: 1,
    //     trainingItemId: 4,
    //     record: 20,
    //     date: 1698346945,
    //   },
    //   {
    //     id: 25,
    //     userId: 1,
    //     trainingItemId: 1,
    //     record: 14,
    //     date: 1698323834,
    //   },
    //   {
    //     id: 26,
    //     userId: 1,
    //     trainingItemId: 2,
    //     record: 42,
    //     date: 1698410234,
    //   },
    //   {
    //     id: 27,
    //     userId: 1,
    //     trainingItemId: 3,
    //     record: 57,
    //     date: 1698446234,
    //   },
    //   {
    //     id: 28,
    //     userId: 1,
    //     trainingItemId: 4,
    //     record: 22,
    //     date: 1698446945,
    //   },
    //   {
    //     id: 29,
    //     userId: 1,
    //     trainingItemId: 1,
    //     record: 16,
    //     date: 1698423834,
    //   },
    //   {
    //     id: 30,
    //     userId: 1,
    //     trainingItemId: 2,
    //     record: 44,
    //     date: 1698510234,
    //   },
    //   {
    //     id: 31,
    //     userId: 1,
    //     trainingItemId: 3,
    //     record: 59,
    //     date: 1698546234,
    //   },
    //   {
    //     id: 32,
    //     userId: 1,
    //     trainingItemId: 4,
    //     record: 24,
    //     date: 1698546945,
    //   },
    //   {
    //     id: 33,
    //     userId: 1,
    //     trainingItemId: 1,
    //     record: 18,
    //     date: 1698523834,
    //   },
    //   {
    //     id: 34,
    //     userId: 1,
    //     trainingItemId: 2,
    //     record: 46,
    //     date: 1698610234,
    //   },
    //   {
    //     id: 35,
    //     userId: 1,
    //     trainingItemId: 3,
    //     record: 61,
    //     date: 1698646234,
    //   },
    //   {
    //     id: 36,
    //     userId: 1,
    //     trainingItemId: 4,
    //     record: 26,
    //     date: 1698646945,
    //   },
    //   {
    //     id: 37,
    //     userId: 1,
    //     trainingItemId: 1,
    //     record: 20,
    //     date: 1698623834,
    //   },
    //   {
    //     id: 38,
    //     userId: 1,
    //     trainingItemId: 2,
    //     record: 48,
    //     date: 1698710234,
    //   },
    //   {
    //     id: 39,
    //     userId: 1,
    //     trainingItemId: 3,
    //     record: 63,
    //     date: 1698746234,
    //   },
    //   {
    //     id: 40,
    //     userId: 1,
    //     trainingItemId: 4,
    //     record: 28,
    //     date: 1698746945,
    //   },
    // ])
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
