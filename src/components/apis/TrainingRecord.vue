<script>
import logger from '@/logger'
import { HttpMethod, requestAuthApi } from '@/components/apis/CommonMethods.vue'
import { TrainingRecord } from '@/components/models/TrainingRecord.vue'

export async function listTrainingRecords() {
  const path = '/training-records'
  const trainingRecordsResults = await requestAuthApi(path, HttpMethod.GET)

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
  logger.trace('createTrainingRecord')
  logger.trace(trainingRecord)

  // null check
  if (
    trainingRecord.trainingItemId == null ||
    trainingRecord.trainingItemId == '' ||
    trainingRecord.record == null ||
    trainingRecord.record == '' ||
    trainingRecord.date == null ||
    trainingRecord.date == ''
  ) {
    logger.error('Error: Invalid value of trainingRecord.')
    throw new Error('Error: Invalid value of trainingRecord.')
  }

  // type check
  if (
    typeof trainingRecord.trainingItemId !== 'number' ||
    typeof trainingRecord.record !== 'number' ||
    typeof trainingRecord.date !== 'number'
  ) {
    logger.error('Error: Invalid type of trainingRecord.')
    throw new Error('Error: Invalid value of trainingRecord.')
  }

  const path = '/training-records'

  const requestData = {
    trainingItemId: trainingRecord.trainingItemId,
    record: trainingRecord.record,
    date: trainingRecord.date,
  }

  const results = await requestAuthApi(path, HttpMethod.POST, requestData)
  logger.trace(results)
}
</script>
