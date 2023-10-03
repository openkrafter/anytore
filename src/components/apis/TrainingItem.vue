<script>
import { TrainingItem } from '@/components/models/TrainingItem.vue'

export async function listTrainingItems() {
  const path = '/training-items'
  const response = await fetch(path)
  const trainingItemsResults = await response.json()
  console.log('listTrainingItems')

  var trainingItems = []
  trainingItemsResults.forEach((trainingItemResult) => {
    var trainingItem = new TrainingItem()
    trainingItem.id = trainingItemResult.id
    trainingItem.userId = trainingItemResult.userId
    trainingItem.name = trainingItemResult.name
    trainingItem.type = trainingItemResult.type
    trainingItem.unit = trainingItemResult.unit
    trainingItem.kcal = trainingItemResult.kcal

    trainingItems.push(trainingItem)
    // console.log(trainingItem)

    // trainingItems.push(
    //   new TrainingItem(
    //     (id = trainingItem.id),
    //     (userId = trainingItem.userId),
    //     (name = trainingItem.name),
    //     (type = trainingItem.type),
    //     (unit = trainingItem.unit),
    //     (kcal = trainingItem.kcal)
    //   )
    // )
  })
  console.log(trainingItems)
  return trainingItems
}
</script>
