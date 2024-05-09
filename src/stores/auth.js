import { defineStore } from 'pinia'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userToken: null,
  }),
  actions: {
    setUserToken(token) {
      this.userToken = token
    },
    userLogout() {
      this.userToken = null
      router.push('/login')
    },
  },
  persist: {
    storage: localStorage,
  },
})
