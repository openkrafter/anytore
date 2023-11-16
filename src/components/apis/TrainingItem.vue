<script>
import { TrainingItem } from '@/components/models/TrainingItem.vue'
import logger from '@/logger'
import { requestApi } from '@/components/apis/CommonMethods.vue'

export async function listTrainingItems() {
  const path = '/training-items'
  const trainingItemsResults = await requestApi(path)

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
    trainingItem.userId == null || // null or undefiend
    trainingItem.userId == '' || // "" or 0
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
  }

  // type check
  if (
    typeof trainingItem.userId !== 'number' ||
    typeof trainingItem.name !== 'string' ||
    typeof trainingItem.type !== 'string' ||
    typeof trainingItem.unit !== 'string' ||
    typeof trainingItem.kcal !== 'number'
  ) {
    logger.error('Error: Invalid type of trainingItem.')
  }

  const path = '/training-items'

  const requestBody = {
    userId: trainingItem.userId,
    name: trainingItem.name,
    type: trainingItem.type,
    unit: trainingItem.unit,
    kcal: trainingItem.kcal,
  }

  const requestData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  }
  const results = await requestApi(path, requestData)
}

export async function updateTrainingItem(trainingItem) {
  logger.trace('updateTrainingItem')
  logger.trace(trainingItem)

  // null check
  if (
    trainingItem.id == null ||
    trainingItem.id == '' ||
    trainingItem.userId == null || // null or undefiend
    trainingItem.userId == '' || // "" or 0
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
  }

  // type check
  if (
    typeof trainingItem.id !== 'number' ||
    typeof trainingItem.userId !== 'number' ||
    typeof trainingItem.name !== 'string' ||
    typeof trainingItem.type !== 'string' ||
    typeof trainingItem.unit !== 'string' ||
    typeof trainingItem.kcal !== 'number'
  ) {
    logger.error('Error: Invalid type of trainingItem.')
  }

  const path = '/training-items/' + trainingItem.id

  const requestBody = {
    userId: trainingItem.userId,
    name: trainingItem.name,
    type: trainingItem.type,
    unit: trainingItem.unit,
    kcal: trainingItem.kcal,
  }

  logger.trace(requestBody)

  const requestData = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  }
  const results = await requestApi(path, requestData)
}

export async function deleteTrainingItem(trainingItemId) {
  logger.trace('deleteTrainingItem')
  logger.trace(trainingItemId)

  // null check
  if (
    trainingItemId == null ||
    trainingItemId == '' ||
    trainingItem.userId == null ||
    trainingItem.userId == ''
  ) {
    logger.error('Error: Invalid value of trainingItem.')
  }

  // type check
  if (
    typeof trainingItemId !== 'number' ||
    typeof trainingItem.userId !== 'number'
  ) {
    logger.error('Error: Invalid type of trainingItem.')
  }

  const path = '/training-items/' + trainingItemId

  const requestData = {
    method: 'DELETE',
  }
  const results = await requestApi(path, requestData)
}
</script>
