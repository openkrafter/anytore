<script>
import logger from '@/logger'
import DisplayTrainingRecords from '@/components/containers/DisplayTrainingRecords.vue'

export default {
  components: {
    DisplayTrainingRecords,
  },

  data() {
    return {
      data: {},
    }
  },
}
</script>

<template>
  <div class="m-4">
    <h1 class="text-4xl">これまでの頑張りとあなたのカラダ</h1>

    <div class="mt-4 ml-4">
      <div>
        <DisplayTrainingRecords />
      </div>
    </div>
  </div>
</template>
