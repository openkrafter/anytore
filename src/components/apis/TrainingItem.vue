<script>
import { TrainingItem } from '@/components/models/TrainingItem.vue'
import logger from '@/logger'
import {
  requestApi,
  requestAuthApi,
  HttpMethod,
} from '@/components/apis/CommonMethods.vue'

export async function listTrainingItems() {
  const path = '/training-items'
  const trainingItemsResults = await requestAuthApi(path, HttpMethod.GET)

  var trainingItems = []
  trainingItemsResults.forEach((trainingItemResult) => {
    // null check
    if (
      trainingItemResult.id == null ||
      trainingItemResult.id == '' ||
      trainingItemResult.userId == null ||
      trainingItemResult.userId == '' ||
      trainingItemResult.name == null ||
      trainingItemResult.name == '' ||
      trainingItemResult.type == null ||
      trainingItemResult.type == '' ||
      trainingItemResult.unit == null ||
      trainingItemResult.unit == '' ||
      trainingItemResult.kcal == null ||
      trainingItemResult.kcal == ''
    ) {
      logger.error('Error: Invalid value of trainingItem.')
    }

    // type check
    if (
      typeof trainingItemResult.id !== 'number' ||
      typeof trainingItemResult.userId !== 'number' ||
      typeof trainingItemResult.name !== 'string' ||
      typeof trainingItemResult.type !== 'string' ||
      typeof trainingItemResult.unit !== 'string' ||
      typeof trainingItemResult.kcal !== 'number'
    ) {
      logger.error('Error: Invalid type of trainingItem.')
    }

    var trainingItem = new TrainingItem(
      trainingItemResult.id,
      trainingItemResult.userId,
      trainingItemResult.name,
      trainingItemResult.type,
      trainingItemResult.unit,
      trainingItemResult.kcal
    )

    trainingItems.push(trainingItem)
  })
  return trainingItems
}

export async function createTrainingItem(trainingItem) {
  logger.trace('createTrainingItem')
  logger.trace(trainingItem)

  // null check
  if (
    trainingItem.name == null ||
    trainingItem.name == '' ||
    trainingItem.type == null ||
    trainingItem.type == '' ||
    trainingItem.unit == null ||
    trainingItem.unit == '' ||
    trainingItem.kcal == null ||
    trainingItem.kcal == ''
  ) {
    logger.error('Error: Invalid value of trainingItem.')
    throw new Error('Error: Invalid value of trainingItem.')
  }

  // type check
  if (
    typeof trainingItem.name !== 'string' ||
    typeof trainingItem.type !== 'string' ||
    typeof trainingItem.unit !== 'string' ||
    typeof trainingItem.kcal !== 'number'
  ) {
    logger.error('Error: Invalid type of trainingItem.')
    throw new Error('Error: Invalid value of trainingItem.')
  }

  const path = '/training-items'

  const requestData = {
    name: trainingItem.name,
    type: trainingItem.type,
    unit: trainingItem.unit,
    kcal: trainingItem.kcal,
  }

  const result = await requestAuthApi(path, HttpMethod.POST, requestData)
}

export async function updateTrainingItem(trainingItem) {
  logger.trace('updateTrainingItem')
  logger.trace(trainingItem)

  // null check
  if (
    trainingItem.id == null ||
    trainingItem.id == '' ||
    trainingItem.name == null ||
    trainingItem.name == '' ||
    trainingItem.type == null ||
    trainingItem.type == '' ||
    trainingItem.unit == null ||
    trainingItem.unit == '' ||
    trainingItem.kcal == null ||
    trainingItem.kcal == ''
  ) {
    logger.error('Error: Invalid value of trainingItem.')
    throw new Error('Error: Invalid value of trainingItem.')
  }

  // type check
  if (
    typeof trainingItem.id !== 'number' ||
    typeof trainingItem.name !== 'string' ||
    typeof trainingItem.type !== 'string' ||
    typeof trainingItem.unit !== 'string' ||
    typeof trainingItem.kcal !== 'number'
  ) {
    logger.error('Error: Invalid type of trainingItem.')
    throw new Error('Error: Invalid value of trainingItem.')
  }

  const path = '/training-items/' + trainingItem.id

  const requestData = {
    name: trainingItem.name,
    type: trainingItem.type,
    unit: trainingItem.unit,
    kcal: trainingItem.kcal,
  }

  const result = await requestAuthApi(path, HttpMethod.PUT, requestData)
}

export async function deleteTrainingItem(trainingItemId) {
  logger.trace('deleteTrainingItem')
  logger.trace(trainingItemId)

  // null check
  if (trainingItemId == null || trainingItemId == '') {
    logger.error('Error: Invalid value of trainingItem.')
    throw new Error('Error: Invalid value of trainingItem.')
  }

  // type check
  if (typeof trainingItemId !== 'number') {
    logger.error('Error: Invalid type of trainingItem.')
    throw new Error('Error: Invalid value of trainingItem.')
  }

  const path = '/training-items/' + trainingItemId

  const result = await requestAuthApi(path, HttpMethod.DELETE)
}
</script>
