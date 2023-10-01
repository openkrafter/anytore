<script>
import DescribeTrainingItems from '@/components/containers/DescribeTrainingItems.vue'
import AddButton from '@/components/basics/AddButton.vue'

export default {
  components: {
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
              <h3
                class="mb-4 text-xl font-medium text-gray-900 dark:text-white"
              >
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
                    v-model="trainingItem.name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="例: ランニング"
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
