import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AddTrainingRecordView from '@/components/pages/AddTrainingRecordView.vue'
import DescribeRecordsView from '@/components/pages/DescribeRecordsView.vue'
import DisplayRecordsView from '@/components/pages/DisplayRecordsView.vue'
import SelectUserView from '@/components/pages/SelectUserView.vue'
import UpdateTrainingItemView from '@/components/pages/UpdateTrainingItemView.vue'
import AdminView from '@/components/pages/AdminView.vue'
import AdminLoginView from '@/components/pages/AdminLoginView.vue'

const routes = [
  {
    path: '/',
    redirect: { name: 'DisplayRecordsView' },
  },
  {
    path: '/select-user',
    name: 'SelectUserView',
    component: SelectUserView,
    meta: { headerType: 'user' },
  },
  {
    path: '/display-records',
    name: 'DisplayRecordsView',
    component: DisplayRecordsView,
    meta: { headerType: 'user' },
  },
  {
    path: '/add-training-record',
    name: 'AddTrainingRecordView',
    component: AddTrainingRecordView,
    meta: { headerType: 'user' },
  },
  {
    path: '/update-training-item',
    name: 'UpdateTrainingItemView',
    component: UpdateTrainingItemView,
    meta: { headerType: 'user' },
  },
  {
    path: '/describe-records',
    name: 'DescribeRecordsView',
    component: DescribeRecordsView,
    meta: { headerType: 'user' },
  },
  {
    path: '/admin-login',
    component: AdminLoginView,
    meta: { headerType: 'login' },
  },
  {
    path: '/admin',
    component: AdminView,
    meta: {
      requiresAdminAuth: true,
      headerType: 'admin',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAdminAuth && !authStore.adminToken) {
    next('/admin-login')
  } else {
    next()
  }
})

export default router
