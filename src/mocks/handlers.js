import { http } from 'msw'
import mockTrainingItems from './resolvers/training-items'
import mockTrainingRecords from './resolvers/training-records'
import mockUsers from './resolvers/users'

export const handlers = [
  // for msw GET /vite.svg
  http.get('/vite.svg', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json())
  }),

  // TrainingItem API
  http.get('/training-items', mockTrainingItems.listTraningItem),
  http.post('/training-items', mockTrainingItems.createTraningItem),
  http.get('/training-items/:trainingItemId', mockTrainingItems.getTraningItem),
  http.put(
    '/training-items/:trainingItemId',
    mockTrainingItems.updateTraningItem
  ),
  http.delete(
    '/training-items/:trainingItemId',
    mockTrainingItems.deleteTraningItem
  ),

  // TrainingRecord API
  http.get('/training-records', mockTrainingRecords.listTraningRecord),
  http.post('/training-records', mockTrainingRecords.createTraningRecord),
  http.get(
    '/training-records/:trainingRecordId',
    mockTrainingRecords.getTraningRecord
  ),
  http.put(
    '/training-records/:trainingRecordId',
    mockTrainingRecords.updateTraningRecord
  ),
  http.delete(
    '/training-records/:trainingRecordId',
    mockTrainingRecords.deleteTraningRecord
  ),

  // User API
  http.get('/users', mockUsers.listUsers),
  http.post('/users', mockUsers.createUser),
]
