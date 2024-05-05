<script>
import { mapActions, mapState } from 'pinia'
import router from '@/router'
import logger from '@/logger'
import { useAuthStore } from '@/stores/auth'
import LightBlueButton from '../basics/LightBlueButton.vue'

export default {
  components: {
    LightBlueButton,
  },

  data() {
    return {
      username: '',
      password: '',
      error: null,
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['adminLogin']),

    async login() {
      this.error = null
      try {
        await this.adminLogin(this.username, this.password)
        router.push('/admin')
      } catch (err) {
        logger.error(err)
        this.error = '管理者名、または管理者名パスワードが誤っています'
      }
    },
  },
}
</script>

<template>
  <div class="ml-2">
    <h2 class="text-2xl">Admin Login</h2>
    <div class="mt-4 ml-4">
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input
            class="ml-2"
            type="text"
            id="username"
            v-model="username"
            required
          />
        </div>
        <div class="mt-2">
          <label for="password">Password:</label>
          <input
            class="ml-2"
            type="password"
            id="password"
            v-model="password"
            required
          />
        </div>
        <div class="mt-2">
          <LightBlueButton type="submit">Login</LightBlueButton>
        </div>
        <p v-if="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
