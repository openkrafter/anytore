<script>
import logger from '@/logger'

export async function createTrainingRecord(trainingRecord) {
  // TODO validation

  logger.trace('createTrainingRecord')
  logger.trace(trainingRecord)
  const path = '/training-records'

  const data = {
    id: trainingRecord.id,
    userId: trainingRecord.userId,
    trainingItemId: trainingRecord.trainingItemId,
    record: trainingRecord.record,
    date: trainingRecord.date,
  }

  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const results = await response.json()

  logger.trace(results)
}
</script>
