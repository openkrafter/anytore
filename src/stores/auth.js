import { defineStore } from 'pinia'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    adminToken: null,
    userToken: null,
  }),
  actions: {
    async adminLogin(name, password) {
      console.log('adminLogin called')
      const validAdminName = import.meta.env.ANYTORE_ADMIN_NAME
      const validAdminPassword = import.meta.env.ANYTORE_ADMIN_PASSWORD

      if (name === validAdminName && password === validAdminPassword) {
        this.adminToken = 'authenticated'
        return true
      } else {
        throw new Error('Invalid credentials')
      }
    },
    adminLogout() {
      this.adminToken = null
      router.push('/admin-login')
    },
  },
  persist: {
    storage: localStorage,
  },
})
