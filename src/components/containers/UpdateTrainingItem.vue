<script>
import {
  createTrainingItem,
  updateTrainingItem,
} from '@/components/apis/TrainingItem.vue'
import { TrainingItem } from '@/components/models/TrainingItem.vue'
import { mapStores } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  data() {
    return {
      trainingItemInput: {},
    }
  },

  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    saveTrainingItem() {
      logger.trace('save training!')
      logger.trace(this.trainingItemInput)

      logger.trace('user store')
      logger.trace(this.userStore.user.id)
      logger.trace(this.userStore.user.name)

      var trainingItem = new TrainingItem(
        null,
        this.userStore.user.id,
        this.trainingItemInput.name,
        this.trainingItemInput.type,
        this.trainingItemInput.unit,
        this.trainingItemInput.kcal
      )

      if (this.trainingItemInput.id == null) {
        createTrainingItem(trainingItem)
      } else {
        trainingItem.id = this.trainingItemInput.id
        updateTrainingItem(trainingItem)
      }
    },

    deleteTrainingItem() {
      logger.trace('delete training!')
      logger.trace(this.trainingItemInput)
    },

    closeTrainingItemModal() {
      logger.trace('close modal')
      this.trainingItemInput = {}
    },
  },
}
</script>

<template>
  <div class="relative w-full max-w-md max-h-full">
    <!-- Modal content -->
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <button
        @click="closeTrainingItemModal"
        type="button"
        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-toggle="add-training-item-modal"
      >
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span class="sr-only">Close modal</span>
      </button>

      <div class="px-6 py-6 lg:px-8">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
          トレーニング項目の追加
        </h3>
        <div class="space-y-6">
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >トレーニング名</label
            >
            <input
              type="text"
              name="name"
              id="name"
              v-model="trainingItemInput.name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="例: ランニング"
              required
            />
          </div>

          <div>
            <label
              for="type"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >トレーニングのタイプ</label
            >

            <select
              name="type"
              id="type"
              v-model="trainingItemInput.type"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            >
              <option value="" selected hidden>-- 選択 --</option>
              <option value="aerobic">有酸素運動</option>
              <option value="anaerobic">無酸素運動</option>
            </select>
          </div>

          <div>
            <label
              for="unit"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >記録単位</label
            >

            <select
              name="unit"
              id="unit"
              v-model="trainingItemInput.unit"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="例: 時間 (h)"
              required
            >
              <option value="" selected hidden>-- 選択 --</option>
              <option value="minute">時間 (min)</option>
              <option value="hour">時間 (h)</option>
              <option value="count">回数</option>
              <option value="distance">距離 (km)</option>
            </select>
          </div>

          <div>
            <label
              for="kcal"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >単位あたりの消費カロリー (kcal)</label
            >
            <input
              type="number"
              name="kcal"
              id="kcal"
              v-model="trainingItemInput.kcal"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="例: 150"
              required
            />
          </div>

          <div class="flex justify-between">
            <button
              @click="saveTrainingItem"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              保存
            </button>
            <button
              @click="deleteTrainingItem"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              削除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
