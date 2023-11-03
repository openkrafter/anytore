<script>
import '@/components/containers/DescribeTrainingItems.css'
import { listTrainingItems } from '@/components/apis/TrainingItem.vue'
import UpdateTrainingItem from '@/components/containers/UpdateTrainingItem.vue'
import logger from '@/logger'
import { Modal } from 'flowbite'
import { openModal } from '@/components/containers/CommonMethods.vue'

export default {
  components: {
    UpdateTrainingItem,
  },

  data() {
    return {
      trainingItems: [],
      modal: null,
    }
  },

  computed: {
    trainingItemTypeName() {
      return this.trainingItems.map((trainingItem) => {
        if (trainingItem.type == 'aerobic') {
          return '有酸素運動'
        } else if (trainingItem.type == 'anaerobic') {
          return '無酸素運動'
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

  methods: {
    updateTrainingItem(trainingItem) {
      logger.trace('update training!')
      const modalId = 'update-training-item-modal' + trainingItem.id
      this.modal = openModal(modalId)
    },

    closeModal() {
      this.modal.hide()
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
      class="relative training-item col-span-5 m-2 p-4 space-y-2 rounded-xl bg-white"
      v-for="(trainingItem, idx) in trainingItems"
    >
      <h3 class="text-xl font-bold">{{ trainingItem.name }}</h3>

      <button
        @click="updateTrainingItem(trainingItem)"
        class="absolute top-3 right-3 inline-flex justify-center items-center bg-white hover:bg-slate-100 active:bg-slate-300"
      >
        <svg
          class="w-6 h-6 text-teal-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 18"
        >
          <path
            d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z"
          />
          <path
            d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z"
          />
        </svg>
        <slot />
      </button>

      <div
        :id="'update-training-item-modal' + trainingItem.id"
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <UpdateTrainingItem :trainingItem=trainingItem @close-modal="closeModal()"/>
      </div>

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
