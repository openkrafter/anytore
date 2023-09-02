import { setupWorker } from 'msw'
import { handlers } from './handlers'
import { trainingItems } from './training-items'
// import { trainingRec } from './training-records'

// export const worker = setupWorker(...handlers)
export const worker = setupWorker(...trainingItems)
// export const trainingItemsWorker = setupWorker(...trainingItems)
// export const trainingRecworker = setupWorker(...trainingRec)
