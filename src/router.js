import { createRouter, createWebHistory } from 'vue-router'
import { getAuthStore } from '@/stores/authStore'
import AddTrainingRecordView from '@/components/pages/AddTrainingRecordView.vue'
import DescribeRecordsView from '@/components/pages/DescribeRecordsView.vue'
import DisplayRecordsView from '@/components/pages/DisplayRecordsView.vue'
import SelectUserView from '@/components/pages/SelectUserView.vue'
import UpdateTrainingItemView from '@/components/pages/UpdateTrainingItemView.vue'
import AdminView from '@/components/pages/AdminView.vue'
import AdminLoginView from '@/components/pages/AdminLoginView.vue'
import UserLoginView from '@/components/pages/UserLoginView.vue'

const routes = [
  {
    path: '/login',
    component: UserLoginView,
    meta: { headerType: 'login' },
  },
  // {
  //   path: '/select-user',
  //   name: 'SelectUserView',
  //   component: SelectUserView,
  //   meta: {
  //     requireUserAuth: true,
  //     headerType: 'user',
  //   },
  // },
  {
    path: '/display-records',
    name: 'DisplayRecordsView',
    component: DisplayRecordsView,
    meta: {
      requireUserAuth: true,
      headerType: 'user',
    },
  },
  {
    path: '/add-training-record',
    name: 'AddTrainingRecordView',
    component: AddTrainingRecordView,
    meta: {
      requireUserAuth: true,
      headerType: 'user',
    },
  },
  {
    path: '/update-training-item',
    name: 'UpdateTrainingItemView',
    component: UpdateTrainingItemView,
    meta: {
      requireUserAuth: true,
      headerType: 'user',
    },
  },
  {
    path: '/describe-records',
    name: 'DescribeRecordsView',
    component: DescribeRecordsView,
    meta: {
      requireUserAuth: true,
      headerType: 'user',
    },
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
      requireAdminAuth: true,
      headerType: 'admin',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // const authStore = useAuthStore()
  const authStore = getAuthStore()
  if (to.meta.requireUserAuth && !authStore.userToken) {
    next('/login')
  } else if (to.meta.requireAdminAuth && !authStore.adminToken) {
    next('/admin-login')
  } else if (to.path === '/') {
    next('/display-records')
  } else {
    next()
  }
})

export default router
