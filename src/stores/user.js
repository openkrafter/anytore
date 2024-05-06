import { defineStore } from 'pinia'
import { User } from '@/components/models/User.vue'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: new User(),
    }
  },
  persist: {
    storage: localStorage,
  },

  actions: {
    setUser(user) {
      this.user.name = user.name
      this.user.email = user.email
    },
  },
})
