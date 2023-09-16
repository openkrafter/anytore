<style src="./DescribeTrainingItems.css" scoped></style>

<script>
import { useUserStore } from '@/stores/user'
import { mapStores } from 'pinia'
import { mapActions } from 'pinia'
// import listTrainingItems from '@/components/api/TrainingItem.vue'
import Button1 from '@/components/basics/Button1.vue'

export default {
  components: {
    Button1,
  },

  data() {
    return {
      trainingItems: [],
    }
  },

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    ...mapActions(useUserStore, ['setUser']),

    testClick() {
      console.log('click!')
    },
  },

  async created() {
    const path = '/training-items'
    const response = await fetch(path)
    const trainingItemsResults = await response.json()
    this.trainingItems.push(...trainingItemsResults)
    console.log(this.trainingItems)
    console.log('aaa')
    console.log(this.userStore.user)
    // this.trainingItems = await listTrainingItems()
  },
}
</script>

<template>
  <Button1 @click="testClick"> 追加 </Button1>
  <p>登録済みトレーニング項目</p>
  <ul>
    <li class="training-item" v-for="trainingItem in trainingItems">
      <h3>{{ trainingItem.name }}</h3>
      <p>
        {{ trainingItem.type }} {{ trainingItem.unit }}
        {{ trainingItem.kcal }}
      </p>
    </li>
  </ul>
</template>
