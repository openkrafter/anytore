<script>
import logger from '@/logger'
import BarChart from '@/components/basics/BarChart.vue'

export default {
  components: {
    BarChart,
  },

  data() {
    return {
      data: {
        labels: [
          ['2023/11/3', '120 kcal'],
          ['2023/11/4', '150 kcal'],
          ['2023/11/5', '150 kcal'],
          ['2023/11/6', '150 kcal'],
          ['2023/11/7', '150 kcal'],
          ['2023/11/8', '150 kcal'],
          ['2023/11/9', '150 kcal'],
          ['2023/11/10', '150 kcal'],
          ['2023/11/11', '150 kcal'],
          ['2023/11/12', '150 kcal'],
          ['2023/11/13', '150 kcal'],
          ['2023/11/14', '150 kcal'],
        ],
        datasets: [
          {
            label: '分',
            backgroundColor: '#000000',
            data: [40, 20, 12, 39, 10, 40, 39, 40, 20, 12, 39, 10],
          },
        ],
      },

      data2: {
        labels: [
          ['2023/11/3', '120 kcal'],
          ['2023/11/4', '150 kcal'],
          ['2023/11/5', '150 kcal'],
          ['2023/11/6', '150 kcal'],
          ['2023/11/7', '150 kcal'],
          ['2023/11/8', '150 kcal'],
          ['2023/11/9', '150 kcal'],
        ],
        datasets: [
          {
            label: '回',
            backgroundColor: '#f87979',
            data: [10, 10, 12, 19, 10, 40, 39, 80, 40, 20, 12, 11],
          },
        ],
      },
      options: {
        responsive: true,
      },

      windowWidth: window.innerWidth,
    }
  },

  mounted: function () {
    console.log(this.data)
    window.addEventListener('resize', this.resizeWindow)
  },

  methods: {
    resizeWindow() {
      this.windowWidth = window.innerWidth
    },
  },
}
</script>

<template>
  <h2 class="text-2xl">トレーニングの記録</h2>
  <div class="grid grid-cols-10">
    <div class="mt-4 ml-4 grid col-start-1 col-span-8">
      <p>チェックボックスエリア</p>
    </div>
    <div class="mt-4 grid col-start-2 col-span-8" :key="windowWidth">
      <BarChart :data="data" :title="'ランニング'" />
    </div>
    <div class="mt-4 grid col-start-2 col-span-8" :key="windowWidth">
      <BarChart :data="data2" :title="'腕立て'" />
    </div>
  </div>
</template>
