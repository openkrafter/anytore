<script>
import { getAuthStore } from '@/stores/authStore'

export default {
  methods: {
    logout() {
      const authStore = getAuthStore()
      authStore.userLogout()
    },
  },
}
</script>

<template>
  <header class="mb-7 px-6 flex justify-between items-center bg-gray-800">
    <!-- Logo text -->
    <div>
      <h1 class="text-4xl py-6 font-semibold italic text-yellow-300">
        ANYTORE
      </h1>
    </div>
    <div>
      <div
        @click="logout"
        class="text-xl text-right text-gray-200 hover:bg-gray-600"
      >
        ログアウト
      </div>
    </div>
  </header>
</template>
