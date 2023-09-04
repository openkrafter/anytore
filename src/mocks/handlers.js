import { rest } from 'msw'
import mockTrainingItems from './resolvers/training-items'

export const handlers = [
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
]
