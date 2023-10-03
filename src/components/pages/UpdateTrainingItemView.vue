<script>
import UpdateTrainingItem from '@/components/containers/UpdateTrainingItem.vue'
import DescribeTrainingItems from '@/components/containers/DescribeTrainingItems.vue'
import AddButton from '@/components/basics/AddButton.vue'

export default {
  components: {
    UpdateTrainingItem,
    DescribeTrainingItems,
    AddButton,
  },

  data() {
    return {
      trainingItem: {},
    }
  },

  methods: {
    addTrainingItem() {
      console.log('add training!')
      // this.trainingItem.push({
      //   name: '',
      //   type: '',
      //   unit: '',
      //   kcal: 0,
      // })
    },

    saveTrainingItem() {
      console.log('save training!')
      console.log(this.trainingItem)
    },

    deleteTrainingItem() {
      console.log('delete training!')
      console.log(this.trainingItem)
    },

    closeTrainingItemModal() {
      console.log('close modal')
      this.trainingItem = {}
    },
  },
}
</script>

<template>
  <div class="m-4">
    <div class="flex justify-between">
      <h1 class="text-4xl">あなたのトレーニング</h1>
      <AddButton
        data-modal-target="add-training-item-modal"
        data-modal-toggle="add-training-item-modal"
        @click="addTrainingItem"
      >
        追加
      </AddButton>

      <!-- Main modal -->
      <div
        id="add-training-item-modal"
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <UpdateTrainingItem />
      </div>
    </div>
    <div class="mt-4 ml-4">
      <DescribeTrainingItems />
    </div>
  </div>
</template>

<style>
body {
  background-color: #eee;
}

.training-item {
  /*
  background-color: white;
  border-radius: 0.5em;
  */
}
</style>
