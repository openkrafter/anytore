<script>
import logger from '@/logger'
import BarChart from '@/components/basics/BarChart.vue'
import LineChart from '@/components/basics/LineChart.vue'
import { listTrainingItems } from '@/components/apis/TrainingItem.vue'
import { listTrainingRecords } from '@/components/apis/TrainingRecord.vue'
import { displayedUnitName } from '@/components/containers/CommonMethods.vue'

const DISPLAYED_DATA_POINTS = 7
const TRAINING_RECORDS_AEROBIC_CHART_COLOR = '#3C59FF'
const TRAINING_RECORDS_ANAEROBIC_CHART_COLOR = '#ED1A3D'

const AGGREGATION_UNIT = Object.freeze({
  DAILY: '日単位で表示する',
  WEEKLY: '週単位で表示する',
  MONTHLY: '月単位で表示する',
})

const CHART_TYPE = Object.freeze({
  BAR: '有酸素運動',
  LINE: '無酸素運動',
})

export default {
  components: {
    BarChart,
    LineChart,
  },

  data() {
    return {
      trainingItems: [],
      trainingRecords: [],

      trainingRecordsChartData: [],

      inputDate: null,

      currentAggregationUnit: AGGREGATION_UNIT.DAILY,
    }
  },

  computed: {
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
    this.CHART_TYPE = CHART_TYPE

    this.initDisplayedDate()
    await this.initTrainingData()
    this.applyTrainingRecordsChartData()
  },

  mounted: function () {
    window.addEventListener('resize', this.refreshChart)
  },

  methods: {
    initDisplayedDate() {
      var currentTime = new Date()
      this.inputDate =
        ('0000' + currentTime.getFullYear()).slice(-4) +
        '-' +
        ('00' + (currentTime.getMonth() + 1)).slice(-2) +
        '-' +
        ('00' + currentTime.getDate()).slice(-2)
    },

    changeDisplayCondition() {
      logger.trace('change condition')
      this.applyTrainingRecordsChartData()
      this.refreshChart()
    },

    async initTrainingData() {
      this.trainingItems = await listTrainingItems()
      this.trainingRecords = await listTrainingRecords()
      this.trainingRecords.sort(this.compareTrainingRecordDate)
    },

    applyTrainingRecordsChartData() {
      this.trainingRecordsChartData = []

      this.trainingItems.forEach((trainingItem) => {
        var chartInputData = {}

        if (this.currentAggregationUnit === AGGREGATION_UNIT.DAILY) {
          chartInputData = this.createDailyChartInputData(trainingItem)
        } else if (this.currentAggregationUnit === AGGREGATION_UNIT.WEEKLY) {
          chartInputData = this.createWeeklyChartInputData(trainingItem)
        } else if (this.currentAggregationUnit === AGGREGATION_UNIT.MONTHLY) {
          chartInputData = this.createMonthlyChartInputData(trainingItem)
        }

        if (chartInputData.labels.length > DISPLAYED_DATA_POINTS) {
          chartInputData.labels = chartInputData.labels.slice(
            -DISPLAYED_DATA_POINTS
          )
          chartInputData.datasets[0].data =
            chartInputData.datasets[0].data.slice(-DISPLAYED_DATA_POINTS)
        }

        var trainingRecordChartData = {
          visible: true,
          chartType: this.getChartType(trainingItem),
          data: chartInputData,
          title: trainingItem.name,
        }
        this.trainingRecordsChartData.push(trainingRecordChartData)
      })
    },

    compareTrainingRecordDate(a, b) {
      return a.date - b.date
    },

    createDailyChartInputData(trainingItem) {
      var chartInputData = this.initChartInputData(trainingItem)
      var dailyTrainingRecordsForChart =
        this.createDailyTrainingRecordsForChart(trainingItem)

      var sortedDailyTrainingRecordsForChartKeys = Object.keys(
        dailyTrainingRecordsForChart
      ).sort(this.compareStringNumber)

      sortedDailyTrainingRecordsForChartKeys.forEach((chartDateKey) => {
        var year = chartDateKey.substring(0, 4)
        var month = chartDateKey.substring(4, 6)
        var date = chartDateKey.substring(6, 8)

        var dateLabel = year + '/' + month + '/' + date
        var calorieLabel =
          trainingItem.kcal * dailyTrainingRecordsForChart[chartDateKey] +
          ' kcal'

        chartInputData.labels.push([dateLabel, calorieLabel])
        chartInputData.datasets[0].data.push(
          dailyTrainingRecordsForChart[chartDateKey]
        )
      })

      return chartInputData
    },

    createDailyTrainingRecordsForChart(trainingItem) {
      var firstTrainingDate = new Date(this.trainingRecords[0].date * 1000)

      var firstInitDate = new Date(firstTrainingDate)
      firstInitDate.setDate(firstTrainingDate.getDate() - 14)
      var lastInitDate = new Date(this.inputDate + ' 23:59:59')

      // zero init
      var dailyTrainingRecordsForChart = {}
      var delta = 86400 * 1000 // 1 day unix time
      for (
        var dateTimeStamp = firstInitDate.getTime();
        dateTimeStamp < lastInitDate.getTime();
        dateTimeStamp += delta
      ) {
        var dateKey = new Date(dateTimeStamp)
        var key =
          ('0000' + dateKey.getFullYear()).slice(-4) +
          ('00' + (dateKey.getMonth() + 1)).slice(-2) +
          ('00' + dateKey.getDate()).slice(-2)
        dailyTrainingRecordsForChart[key] = 0.0
      }

      var displayedDateFilteredTrainingRecords = this.trainingRecords.filter(
        (trainingRecord) => {
          return trainingRecord.date * 1000 < lastInitDate.getTime()
        }
      )

      displayedDateFilteredTrainingRecords.forEach((trainingRecord) => {
        if (trainingItem.id === trainingRecord.trainingItemId) {
          var trainingDate = new Date(trainingRecord.date * 1000)
          var trainingDateKey =
            ('0000' + trainingDate.getFullYear()).slice(-4) +
            ('00' + (trainingDate.getMonth() + 1)).slice(-2) +
            ('00' + trainingDate.getDate()).slice(-2)

          dailyTrainingRecordsForChart[trainingDateKey] += trainingRecord.record
        }
      })

      return dailyTrainingRecordsForChart
    },

    compareStringNumber(a, b) {
      return Number(a) - Number(b)
    },

    createWeeklyChartInputData(trainingItem) {
      var chartInputData = this.initChartInputData(trainingItem)

      var weeklyTrainingRecordsForChart =
        this.createWeeklyTrainingRecordsForChart(trainingItem)

      var sortedWeeklyTrainingRecordsForChartKeys = Object.keys(
        weeklyTrainingRecordsForChart
      ).sort(this.compareStringNumber)

      sortedWeeklyTrainingRecordsForChartKeys.forEach((chartDateKey) => {
        var year = chartDateKey.substring(0, 4)
        var month = chartDateKey.substring(4, 6)
        var date = chartDateKey.substring(6, 8)
        var dateLabel = year + '/' + month + '/' + date + ' 週'

        var weeklyAverage = this.calculateAverage(
          weeklyTrainingRecordsForChart[chartDateKey]
        )

        var calorieLabel =
          '合計' +
          parseInt(
            trainingItem.kcal *
              weeklyAverage *
              weeklyTrainingRecordsForChart[chartDateKey].length
          ) +
          ' kcal'

        chartInputData.labels.push([dateLabel, calorieLabel])
        chartInputData.datasets[0].data.push(weeklyAverage)
      })

      return chartInputData
    },

    createWeeklyTrainingRecordsForChart(trainingItem) {
      var firstTrainingDate = new Date(this.trainingRecords[0].date * 1000)
      var beforeMonday = this.getBeforeMonday(firstTrainingDate)
      var nextMonday = this.getNextMonday(beforeMonday)

      var firstInitDate = new Date(beforeMonday)
      var lastInitDate = new Date(this.inputDate + ' 23:59:59')

      // zero init
      var weeklyTrainingRecordsForChart = {}
      var delta = 86400 * 1000 * 7 // 7 day unix time
      for (
        var dateTimeStamp = firstInitDate.getTime();
        dateTimeStamp < lastInitDate.getTime();
        dateTimeStamp += delta
      ) {
        var dateKey = new Date(dateTimeStamp)
        var key =
          ('0000' + dateKey.getFullYear()).slice(-4) +
          ('00' + (dateKey.getMonth() + 1)).slice(-2) +
          ('00' + dateKey.getDate()).slice(-2)
        weeklyTrainingRecordsForChart[key] = [0.0]
      }

      var displayedDateFilteredTrainingRecords = this.trainingRecords.filter(
        (trainingRecord) => {
          return trainingRecord.date * 1000 < lastInitDate.getTime()
        }
      )

      displayedDateFilteredTrainingRecords.forEach((trainingRecord) => {
        if (trainingItem.id === trainingRecord.trainingItemId) {
          var trainingDate = new Date(trainingRecord.date * 1000)

          if (nextMonday.getTime() <= trainingDate.getTime()) {
            beforeMonday = nextMonday
            nextMonday = this.getNextMonday(beforeMonday)
          }

          var beforeMondayKey =
            ('0000' + beforeMonday.getFullYear()).slice(-4) +
            ('00' + (beforeMonday.getMonth() + 1)).slice(-2) +
            ('00' + beforeMonday.getDate()).slice(-2)

          if (
            weeklyTrainingRecordsForChart[beforeMondayKey].length === 1 &&
            weeklyTrainingRecordsForChart[beforeMondayKey][0] === 0
          ) {
            weeklyTrainingRecordsForChart[beforeMondayKey][0] =
              trainingRecord.record
          } else {
            weeklyTrainingRecordsForChart[beforeMondayKey].push(
              trainingRecord.record
            )
          }
        }
      })

      return weeklyTrainingRecordsForChart
    },

    getBeforeMonday(date) {
      var delta = 1 - date.getDay()
      if (date.getDay() === 0) {
        delta = -6
      }

      var beforeMonday = new Date(date)
      beforeMonday.setDate(date.getDate() + delta)
      return beforeMonday
    },

    getNextMonday(date) {
      var delta = 8 - date.getDay()
      if (date.getDay() === 0) {
        delta = 1
      }

      var nextMonday = new Date(date)
      nextMonday.setDate(date.getDate() + delta)
      return nextMonday
    },

    calculateAverage(array) {
      var sum = 0.0
      array.forEach((num) => {
        sum = sum + num
      })
      return sum / array.length
    },

    createMonthlyChartInputData(trainingItem) {
      var chartInputData = this.initChartInputData(trainingItem)

      // TODO

      return chartInputData
    },

    initChartInputData(trainingItem) {
      var labelString = ''
      if (this.currentAggregationUnit === AGGREGATION_UNIT.DAILY) {
        labelString = displayedUnitName(trainingItem.unit)
      } else if (this.currentAggregationUnit === AGGREGATION_UNIT.WEEKLY) {
        labelString = '平均' + displayedUnitName(trainingItem.unit)
      } else if (this.currentAggregationUnit === AGGREGATION_UNIT.MONTHLY) {
        labelString = '平均' + displayedUnitName(trainingItem.unit)
      }

      return {
        labels: [],
        datasets: [
          {
            label: labelString,
            backgroundColor: this.getChartColor(trainingItem),
            barPercentage: 0.5,
            data: [],
          },
        ],
      }
    },

    getChartColor(trainingItem) {
      if (trainingItem.type === 'aerobic') {
        return TRAINING_RECORDS_AEROBIC_CHART_COLOR
      } else if (trainingItem.type === 'anaerobic') {
        return TRAINING_RECORDS_ANAEROBIC_CHART_COLOR
      }
    },

    getChartType(trainingItem) {
      if (trainingItem.type === 'aerobic') {
        return CHART_TYPE.BAR
      } else if (trainingItem.type === 'anaerobic') {
        return CHART_TYPE.LINE
      }
    },

    async refreshChart() {
      this.trainingRecordsChartData.forEach((trainingRecordChartData) => {
        trainingRecordChartData.visible = !trainingRecordChartData.visible
      })
      await this.$nextTick(() => {
        this.trainingRecordsChartData.forEach((trainingRecordChartData) => {
          trainingRecordChartData.visible = !trainingRecordChartData.visible
        })
      })
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
    >
      <BarChart
        v-if="
          trainingRecordChartData.visible &&
          trainingRecordChartData.chartType === CHART_TYPE.BAR
        "
        :data="trainingRecordChartData.data"
        :title="trainingRecordChartData.title"
      />
      <LineChart
        v-else-if="
          trainingRecordChartData.visible &&
          trainingRecordChartData.chartType === CHART_TYPE.LINE
        "
        :data="trainingRecordChartData.data"
        :title="trainingRecordChartData.title"
      />
    </div>
  </div>
</template>
