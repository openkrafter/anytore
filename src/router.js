import { createRouter, createWebHistory } from 'vue-router'
import AddTrainingRecordView from '@/components/pages/AddTrainingRecordView.vue'
import DescribeRecordsView from '@/components/pages/DescribeRecordsView.vue'
import DisplayRecordsView from '@/components/pages/DisplayRecordsView.vue'
import LoginView from '@/components/pages/LoginView.vue'
import UpdateTrainingItemView from '@/components/pages/UpdateTrainingItemView.vue'

const routes = [
  {
    path: '/',
    redirect: { name: 'DisplayRecordsView' },
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
  },
  {
    path: '/display-records',
    name: 'DisplayRecordsView',
    component: DisplayRecordsView,
  },
  {
    path: '/add-training-record',
    name: 'AddTrainingRecordView',
    component: AddTrainingRecordView,
  },
  {
    path: '/update-training-item',
    name: 'UpdateTrainingItemView',
    component: UpdateTrainingItemView,
  },
  {
    path: '/describe-records',
    name: 'DescribeRecordsView',
    component: DescribeRecordsView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
