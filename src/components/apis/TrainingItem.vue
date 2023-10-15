<script>
import { TrainingItem } from '@/components/models/TrainingItem.vue'
import logger from '@/logger'
import { requestApi } from '@/components/apis/RequestApi.vue'

export async function listTrainingItems() {
  const path = '/training-items'
  const response = await fetch(path)
  const trainingItemsResults = await response.json()
  logger.trace('listTrainingItems')
  // TODO validation

  var trainingItems = []
  trainingItemsResults.forEach((trainingItemResult) => {
    var trainingItem = new TrainingItem(
      trainingItemResult.id,
      trainingItemResult.userId,
      trainingItemResult.name,
      trainingItemResult.type,
      trainingItemResult.unit,
      trainingItemResult.kcal
    )

    trainingItems.push(trainingItem)
    // logger.trace(trainingItem)
  })
  logger.trace(trainingItems)
  return trainingItems
}

export async function createTrainingItem(trainingItem) {
  logger.trace(trainingItem)

  // null check
  if (
    trainingItem.userId == null || // null or undefiend
    trainingItem.userId == '' ||
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

  const path = '/training-itemsbbb'

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
  try {
    const results = await requestApi(path, requestData)
  } catch {
    logger.error('Error: API request failed.')
  }
}

export async function updateTrainingItem(trainingItem) {
  // TODO validation

  logger.trace('updateTrainingItem')
  logger.trace(trainingItem)
  const path = '/training-items'

  const data = {
    id: trainingItem.id,
    userId: trainingItem.userId,
    name: trainingItem.name,
    type: trainingItem.type,
    unit: trainingItem.unit,
    kcal: trainingItem.kcal,
  }

  const response = await fetch(path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const results = await response.json()

  logger.trace(results)
}
</script>
