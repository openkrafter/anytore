<script>
import logger from '@/logger'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  components: {
    Bar,
  },

  data() {
    return {
      data: {
        labels: [
          ['2023/11/3', '120 kcal'],
          ['2023/11/4', '150 kcal'],
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
          },
        ],
      },

      options: {
        responsive: true,
        // maintainAspectRatio: false
      },
    }
  },

  mounted: function () {
    logger.trace('register')
    // ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
  },
}
</script>

<template>
  <p>これまでの頑張りとあなたのカラダ</p>
  <Bar :data="data" :options="options" />
</template>
