<script>
import AddTrainingRecord from '@/components/containers/AddTrainingRecord.vue'

export default {
  components: {
    AddTrainingRecord,
  },
}
</script>

<template>
  <div class="m-4">
    <div class="flex justify-between">
      <h1 class="text-4xl">頑張りを記録</h1>
    </div>
    <div class="mt-4 ml-4">
      <AddTrainingRecord />
    </div>
  </div>
</template>
