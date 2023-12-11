<script>
import UpdateTrainingItem from '@/components/containers/UpdateTrainingItem.vue'
import DescribeTrainingItems from '@/components/containers/DescribeTrainingItems.vue'
import LightBlueButton from '@/components/basics/LightBlueButton.vue'
import logger from '@/logger'
import { openModal } from '@/components/containers/CommonMethods.vue'

export default {
  components: {
    UpdateTrainingItem,
    DescribeTrainingItems,
    LightBlueButton,
  },

  data() {
    return {
      trainingItem: {},
      modal: null,
    }
  },

  methods: {
    addTrainingItem(modalId) {
      logger.trace('add training!')
      this.modal = openModal(modalId)
    },

    closeModal() {
      this.modal.hide()
    },
  },
}
</script>

<template>
  <div class="m-4">
    <div class="flex justify-between">
      <h1 class="text-4xl">あなたのトレーニング</h1>
      <LightBlueButton @click="addTrainingItem('add-training-item-modal')">
        追加
      </LightBlueButton>

      <!-- Main modal -->
      <div
        id="add-training-item-modal"
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <UpdateTrainingItem @close-modal="closeModal()" />
      </div>
    </div>
    <div class="mt-4 ml-4">
      <DescribeTrainingItems />
    </div>
  </div>
</template>

<style>
body {
  /*
  background-color: #eee;
*/
}

.training-item {
  /*
  background-color: white;
  border-radius: 0.5em;
  */
}
</style>
