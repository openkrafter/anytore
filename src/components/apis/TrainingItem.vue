<script>
import { TrainingItem } from '@/components/models/TrainingItem.vue'

export async function listTrainingItems() {
  const path = '/training-items'
  const response = await fetch(path)
  const trainingItemsResults = await response.json()
  console.log('listTrainingItems')
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
    // console.log(trainingItem)
  })
  console.log(trainingItems)
  return trainingItems
}

export async function createTrainingItem(trainingItem) {
  // TODO validation

  console.log('createTrainingItem')
  console.log(trainingItem)
  const path = '/training-items'

  const data = {
    userId: trainingItem.userId,
    name: trainingItem.name,
    type: trainingItem.type,
    unit: trainingItem.unit,
    kcal: trainingItem.kcal,
  }

  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const results = await response.json()

  console.log(results)
}

export async function updateTrainingItem(trainingItem) {
  // TODO validation

  console.log('updateTrainingItem')
  console.log(trainingItem)
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

  console.log(results)
}
</script>
