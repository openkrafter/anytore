<script>
import TrainingItem from '@/components/models/TrainingItem.vue'

export async function getTrainingItems() {
  const path = '/training-items'
  const response = await fetch(path)
  const trainingItemsResults = await response.json()
  return new TrainingItem(
    (id = trainingItemsResults.id),
    (userId = trainingItemsResults.userId),
    (name = trainingItemsResults.name),
    (type = trainingItemsResults.type),
    (unit = trainingItemsResults.unit),
    (kcal = trainingItemsResults.kcal)
  )
  // this.trainingItems.push(...trainingItemsResults)
  // console.log(this.trainingItems)
}
</script>
