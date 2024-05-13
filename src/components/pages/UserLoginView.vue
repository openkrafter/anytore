<script>
import LightBlueButton from '@/components/basics/LightBlueButton.vue'
import router from '@/router'
import { login } from '@/components/apis/Login.vue'
import { User } from '@/components/models/User.vue'
import logger from '@/logger'
import { getAuthStore } from '@/stores/authStore'
import { getUserStore } from '@/stores/userStore'

export default {
  components: {
    LightBlueButton,
  },

  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async execLogin() {
      this.error = null

      try {
        var loginUser = new User(null, '', this.email, this.password)
        const { token, user } = await login(loginUser)

        const authStore = getAuthStore()
        authStore.setUserToken(token)

        const userStore = getUserStore()
        userStore.setUser(user)

        router.push('/display-records')
      } catch (err) {
        logger.error(err)
        this.error = 'ユーザー名、またはパスワードが誤っています'
      }
    },
  },
}
</script>

<template>
  <div>
    <div class="ml-2">
      <h2 class="text-2xl">User Login</h2>
      <div class="mt-4 ml-4">
        <form @submit.prevent="execLogin">
          <div class="grid grid-cols-10 gap-2">
            <label class="col-span-1 flex items-center" for="email"
              >Email:</label
            >
            <input
              class="col-span-4 ml-2"
              type="email"
              id="email"
              v-model="email"
              required
            />
          </div>
          <div class="mt-2 grid grid-cols-10 gap-2">
            <label class="col-span-1 flex items-center" for="password"
              >Password:</label
            >
            <input
              class="col-span-4 ml-2"
              type="password"
              id="password"
              v-model="password"
              required
            />
          </div>
          <div class="mt-4">
            <LightBlueButton type="submit">ログイン</LightBlueButton>
          </div>
          <p v-if="error">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>
