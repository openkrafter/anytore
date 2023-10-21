import { rest } from 'msw'
import mockTrainingItems from './resolvers/training-items'
import mockTrainingRecords from './resolvers/training-records'

export const handlers = [
  // for msw GET /vite.svg
  rest.get('/vite.svg', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json())
  }),

  // TrainingItem API
  rest.get('/training-items', mockTrainingItems.listTraningItem),
  rest.post('/training-items', mockTrainingItems.createTraningItem),
  rest.get('/training-items/:trainingItemId', mockTrainingItems.getTraningItem),
  rest.put(
    '/training-items/:trainingItemId',
    mockTrainingItems.updateTraningItem
  ),
  rest.delete(
    '/training-items/:trainingItemId',
    mockTrainingItems.deleteTraningItem
  ),

  // TrainingRecord API
  rest.get('/training-records', mockTrainingRecords.listTraningRecord),
  rest.post('/training-records', mockTrainingRecords.createTraningRecord),
  rest.get(
    '/training-records/:trainingRecordId',
    mockTrainingRecords.getTraningRecord
  ),
  rest.put(
    '/training-records/:trainingRecordId',
    mockTrainingRecords.updateTraningRecord
  ),
  rest.delete(
    '/training-records/:trainingRecordId',
    mockTrainingRecords.deleteTraningRecord
  ),
]
