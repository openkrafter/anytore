<script>
import logger from '@/logger'
import { requestApi } from '@/components/apis/CommonMethods.vue'
import { TrainingRecord } from '@/components/models/TrainingRecord.vue'

export async function listTrainingRecords() {
  const path = '/training-records'
  const trainingRecordsResults = await requestApi(path)

  var trainingRecords = []
  trainingRecordsResults.forEach((trainingRecordResult) => {
    if (
      trainingRecordResult.id == null ||
      trainingRecordResult.id == '' ||
      trainingRecordResult.userId == null ||
      trainingRecordResult.userId == '' ||
      trainingRecordResult.trainingItemId == null ||
      trainingRecordResult.trainingItemId == '' ||
      trainingRecordResult.record == null ||
      trainingRecordResult.record == '' ||
      trainingRecordResult.date == null ||
      trainingRecordResult.date == ''
    ) {
      logger.error('Error: Invalid value of trainingRecord.')
    }

    if (
      typeof trainingRecordResult.id !== 'number' ||
      typeof trainingRecordResult.userId !== 'number' ||
      typeof trainingRecordResult.trainingItemId !== 'number' ||
      typeof trainingRecordResult.record !== 'number' ||
      typeof trainingRecordResult.date !== 'number'
    ) {
      logger.error('Error: Invalid type of trainingRecord.')
    }

    var trainingRecord = new TrainingRecord(
      trainingRecordResult.id,
      trainingRecordResult.userId,
      trainingRecordResult.trainingItemId,
      trainingRecordResult.record,
      trainingRecordResult.date
    )

    trainingRecords.push(trainingRecord)
  })
  return trainingRecords
}

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
