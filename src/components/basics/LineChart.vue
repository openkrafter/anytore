<script>
// import logger from '@/logger'
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   CategoryScale,
//   LinearScale,
// } from 'chart.js'
// import { Bar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'vue-chartjs'

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  components: {
    // Bar,
    Line,
  },

  props: {
    data: Object,
    title: String,
  },

  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: false,

        plugins: {
          title: {
            display: true,
            text: this.title,
            font: {
              size: 20,
            },
            padding: {
              top: 10,
              bottom: 30,
            },
          },
          legend: {
            display: true,
            align: 'end',
            pointStyle: 'circle',
            labels: {
              // fontSize: 20,
              // fontColor: '#F00',
              usePointStyle: true,
            },
          },
        },
      },
    }
  },

  computed: {
    maxValue: function () {
      return Math.max(...this.data.datasets[0].data) * 1.2
    },
  },

  beforeMount: function () {
    this.options.scales = {
      y: {
        min: 0,
        max: this.maxValue,
      },
    }
  },

  mounted: function () {},
  methods: {},
}
</script>

<template>
  <!-- <Bar :data="data" :options="options" /> -->
  <Line :data="data" :options="options" />
</template>
