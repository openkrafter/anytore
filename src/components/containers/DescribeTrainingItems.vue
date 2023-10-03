<script>
import '@/components/containers/DescribeTrainingItems.css'
import { listTrainingItems } from '@/components/apis/TrainingItem.vue'

export default {
  data() {
    return {
      trainingItems: [],
    }
  },

  computed: {
    trainingItemTypeName() {
      return this.trainingItems.map((trainingItem) => {
        if (trainingItem.type == 'aerobic') {
          return '有酸素'
        } else if (trainingItem.type == 'anaerobic') {
          return '無酸素'
        }
      })
    },

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
  },

  async created() {
    this.trainingItems = await listTrainingItems()
  },
}
</script>

<template>
  <h2 class="text-2xl">登録済みトレーニング項目</h2>

  <div class="grid grid-cols-10 gap-4 mt-4">
    <div
      class="training-item col-span-5 m-2 p-4 space-y-2 rounded-xl bg-white"
      v-for="(trainingItem, idx) in trainingItems"
    >
      <h3 class="text-xl font-bold">{{ trainingItem.name }}</h3>
      <div class="ml-2">
        運動タイプ:
        <span class="font-semibold">{{ trainingItemTypeName[idx] }}</span>
      </div>
      <div class="ml-2">
        運動単位:
        <span class="font-semibold">{{ trainingItemUnitName[idx] }}</span>
      </div>
      <div class="ml-2">
        単位当たりの消費カロリー:
        <span class="font-semibold">{{ trainingItem.kcal }}</span>
      </div>
    </div>
  </div>
</template>
