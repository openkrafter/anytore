<script>
import logger from '@/logger'
import LightBlueButton from '@/components/basics/LightBlueButton.vue'
import { listTrainingItems } from '@/components/apis/TrainingItem.vue'
import { createTrainingRecord } from '@/components/apis/TrainingRecord.vue'
import { TrainingRecord } from '@/components/models/TrainingRecord.vue'
import { mapStores } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  components: {
    LightBlueButton,
  },

  data() {
    return {
      trainingItems: [],
      selectedTrainingItemIndex: '',
      trainingRecordInput: '0',
      inputDate: '',
    }
  },

  computed: {
    ...mapStores(useUserStore),

    trainingItemUnitName() {
      return this.trainingItems.map((trainingItem) => {
        if (trainingItem.unit == 'hour') {
          return '時間 (h)'
        } else if (trainingItem.unit == 'minute') {
          return '時間 (min)'
        } else if (trainingItem.unit == 'count') {
          return '回数'
        } else if (trainingItem.unit == 'distance') {
          return '距離'
        }
      })
    },

    trainingDate() {
      const date = new Date(this.inputDate)
      return Math.floor(date.getTime() / 1000)
    },
  },

  async created() {
    var currentTime = new Date()
    this.inputDate =
      ('0000' + currentTime.getFullYear()).slice(-4) +
      '-' +
      ('00' + (currentTime.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + currentTime.getDate()).slice(-2)

    const trainingItemsResults = await listTrainingItems()
    this.trainingItems.push(...trainingItemsResults)
    logger.trace(this.trainingItems)
  },

  methods: {
    addTrainingRecord() {
      logger.trace('add training record!')

      if (this.selectedTrainingItemIndex === '')
        return alert('トレーニング項目を選択してください')
      if (this.trainingRecordInput <= 0)
        return alert('トレーニング実績には 0 より大きな数値を入力してください')

      var trainingRecord = new TrainingRecord(
        null,
        this.userStore.user.id,
        this.trainingItems[this.selectedTrainingItemIndex].id,
        this.trainingRecordInput,
        this.trainingDate
      )
      createTrainingRecord(trainingRecord)
    },
  },
}
</script>

<template>
  <h2 class="text-2xl">トレーニング項目</h2>
  <div>
    <select
      name="training-item"
      id="training-item"
      v-model="selectedTrainingItemIndex"
      class="mt-4 px-5 py-2.5 rounded-lg bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
      required
    >
      <option value="" disabled>(トレーニング項目を選択)</option>
      <option v-for="(trainingItem, index) in trainingItems" :value="index">
        {{ trainingItem.name }}
      </option>
    </select>
  </div>

  <h2 class="text-2xl mt-10">トレーニング実績の入力</h2>
  <div class="mt-4 ml-4">
    <div v-if="selectedTrainingItemIndex === ''">(トレーニング項目を選択)</div>
    <div v-else>
      <div class="mb-4">
        <label for="training-date">トレーニング日時の選択</label>
        <input
          class="ml-5"
          id="training-date"
          type="date"
          v-model="inputDate"
        />
      </div>

      <div class="inline-block">
        {{ trainingItemUnitName[selectedTrainingItemIndex] }}
      </div>
      <input
        type="number"
        name="record"
        id="record"
        v-model="trainingRecordInput"
        class="inline-block ml-5 w-24 marker:rounded-lg bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        required
      />
    </div>
  </div>

  <div class="mt-10 ml-4">
    <LightBlueButton @click="addTrainingRecord"> 登録 </LightBlueButton>
  </div>
</template>
