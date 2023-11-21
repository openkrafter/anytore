<script>
import logger from '@/logger'
import DisplayTrainingRecords from '@/components/containers/DisplayTrainingRecords.vue'
import DisplayCompositionRecords from '@/components/containers/DisplayCompositionRecords.vue'

export default {
  components: {
    DisplayTrainingRecords,
    DisplayCompositionRecords,
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
      <h2>体組成データの記録</h2>
      <div>
        <DisplayCompositionRecords />
      </div>
    </div>
  </div>
</template>
