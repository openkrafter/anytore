<script>
import logger from '@/logger'
import BarChart from '@/components/basics/BarChart.vue'
import { mapStores } from 'pinia'
import { useUserStore } from '@/stores/user'
import { listTrainingItems } from '@/components/apis/TrainingItem.vue'
import { listTrainingRecords } from '@/components/apis/TrainingRecord.vue'
import { displayedUnitName } from '@/components/containers/CommonMethods.vue'

const DISPLAYED_DATA_POINTS = 7
const TRAINING_RECORDS_CHART_COLOR = '#3C59FF'

const AGGREGATION_UNIT = Object.freeze({
  DAILY: '日単位で表示する',
  WEEKLY: '週単位で表示する',
  MONTHLY: '月単位で表示する',
})

export default {
  components: {
    BarChart,
  },

  data() {
    return {
      windowWidth: window.innerWidth,

      trainingItems: [],
      trainingRecords: [],

      trainingRecordsChartData: [],

      inputDate: null,

      currentAggregationUnit: AGGREGATION_UNIT.DAILY,
    }
  },

  computed: {
    ...mapStores(useUserStore),

    displayedDate: function () {
      var displayedDateString = this.inputDate + ' 23:59:59'
      return new Date(displayedDateString)
    },

    filteredTrainingRecords: function () {
      return this.trainingRecords.filter((trainingRecord) => {
        var displayedDate = new Date(this.inputDate + ' 23:59:59')
        return trainingRecord.date * 1000 < this.displayedDate.getTime()
      })
    },
  },

  async created() {
    this.AGGREGATION_UNIT = AGGREGATION_UNIT

    this.initDisplayedDate()
    await this.initTrainingData()
    this.applyTrainingRecordsChartData()
  },

  mounted: function () {
    window.addEventListener('resize', this.resizeWindow)
  },

  methods: {
    resizeWindow() {
      this.windowWidth = window.innerWidth
    },

    initDisplayedDate() {
      var currentTime = new Date()
      this.inputDate = '2023-09-19'
    },

    changeDisplayCondition() {
      logger.trace('change condition')
      this.applyTrainingRecordsChartData()
    },

    async initTrainingData() {
      this.trainingItems = await listTrainingItems()
      this.trainingRecords = await listTrainingRecords()
      this.trainingRecords.sort(this.compareTrainingRecordDate)
    },

    applyTrainingRecordsChartData() {
      if (this.currentAggregationUnit === AGGREGATION_UNIT.DAILY) {
        this.applyTrainingRecordsDailyChartData()
      } else if (this.currentAggregationUnit === AGGREGATION_UNIT.WEEKLY) {
        this.applyTrainingRecordsWeeklyChartData()
      } else if (this.currentAggregationUnit === AGGREGATION_UNIT.MONTHLY) {
        this.applyTrainingRecordsMonthlyChartData()
      }
    },

    applyTrainingRecordsDailyChartData() {
      this.trainingRecordsChartData = []

      this.trainingItems.forEach((trainingItem) => {
        var chartInputData = {
          labels: [],
          datasets: [
            {
              label: displayedUnitName(trainingItem.unit),
              backgroundColor: TRAINING_RECORDS_CHART_COLOR,
              barPercentage: 0.5,
              data: [],
            },
          ],
        }

        this.filteredTrainingRecords.forEach((trainingRecord) => {
          if (trainingItem.id === trainingRecord.trainingItemId) {
            var dateTime = new Date(trainingRecord.date * 1000)
            chartInputData.labels.push([
              dateTime.toLocaleDateString('ja-JP'),
              trainingItem.kcal * trainingRecord.record + ' kcal',
            ])
            chartInputData.datasets[0].data.push(trainingRecord.record)
          }
        })
        if (chartInputData.labels.length > DISPLAYED_DATA_POINTS) {
          chartInputData.labels = chartInputData.labels.slice(
            -DISPLAYED_DATA_POINTS
          )
          chartInputData.datasets[0].data =
            chartInputData.datasets[0].data.slice(-DISPLAYED_DATA_POINTS)
        }

        var trainingRecordChartData = {
          visible: true,
          data: chartInputData,
          title: trainingItem.name,
        }
        this.trainingRecordsChartData.push(trainingRecordChartData)
      })
    },

    applyTrainingRecordsWeeklyChartData() {
      logger.trace('weekly')
    },

    applyTrainingRecordsMonthlyChartData() {
      logger.trace('monthly')
    },

    compareTrainingRecordDate(a, b) {
      return a.date - b.date
    },
  },
}
</script>

<template>
  <h2 class="text-2xl">トレーニングの記録</h2>
  <div class="grid grid-cols-10">
    <div class="mt-4 ml-4 grid col-start-1 col-span-4">
      <div v-for="(trainingRecordChartData, idx) in trainingRecordsChartData">
        <input
          type="checkbox"
          :id="'visibleTrainingRecord' + idx"
          v-model="trainingRecordChartData.visible"
        />
        <label :for="'visibleTrainingRecord' + idx"
          >{{ trainingRecordChartData.title }}
        </label>
      </div>
    </div>
    <div class="mt-4 ml-4 grid col-start-7 col-span-2">
      <label for="displayed-date">表示日時の選択</label>
      <input
        id="displayed-date"
        type="date"
        @change="changeDisplayCondition"
        v-model="inputDate"
      />

      <label for="current-aggregation-unit">表示単位の選択</label>
      <select
        name="current-aggregation-unit"
        id="current-aggregation-unit"
        @change="changeDisplayCondition"
        v-model="currentAggregationUnit"
        required
      >
        <option :value="AGGREGATION_UNIT.DAILY">
          {{ AGGREGATION_UNIT.DAILY }}
        </option>
        <option :value="AGGREGATION_UNIT.WEEKLY">
          {{ AGGREGATION_UNIT.WEEKLY }}
        </option>
        <option :value="AGGREGATION_UNIT.MONTHLY">
          {{ AGGREGATION_UNIT.MONTHLY }}
        </option>
      </select>
    </div>

    <div
      v-for="trainingRecordChartData in trainingRecordsChartData"
      class="mt-4 grid col-start-2 col-span-8"
      :key="windowWidth"
    >
      <BarChart
        v-if="trainingRecordChartData.visible"
        :data="trainingRecordChartData.data"
        :title="trainingRecordChartData.title"
      />
    </div>
  </div>
</template>
