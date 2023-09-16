import { defineStore } from 'pinia'
import { User } from '@/components/models/User.vue'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: new User(1, 'test-user'),
      // TODO: あとで戻す
      // user: new User(),
    }
  },

  actions: {
    setUser(user) {
      this.user.id = user.id
      this.user.name = user.name
    },
  },
})
