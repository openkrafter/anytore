<script>
import { useUserStore } from '@/stores/user'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useUserStore),

    // getUserName returns the current user name
    getUserName() {
      return this.userStore.user.name
    },
  },
}
</script>

<template>
  <header class="mb-7 px-6 flex justify-between items-center bg-gray-800">
    <!-- Logo text -->
    <div>
      <h1 class="text-2xl font-semibold italic text-yellow-300">ANYTORE</h1>
    </div>
    <!-- Menu -->
    <div>
      <!-- First line -->
      <div
        v-if="getUserName === ''"
        class="px-6 mt-4 mb-2 text-right text-yellow-300"
      >
        ※ 未ログイン： ユーザを選択してください！
      </div>
      <div v-else class="px-6 mt-4 mb-1 text-right text-sm text-yellow-300">
        {{ getUserName }} さん
      </div>
      <!-- Second line -->
      <ul class="md:flex">
        <li class="border-b md:border-none text-gray-200">
          <router-link to="/" class="block px-6 mb-4 hover:bg-gray-600 rounded"
            >TOP</router-link
          >
        </li>
        <li class="border-b md:border-none text-gray-200">
          <router-link
            to="/add-training-record"
            class="block px-6 mb-4 hover:bg-gray-600 rounded"
            >今日の頑張り</router-link
          >
        </li>
        <li class="border-b md:border-none text-gray-200">
          <router-link
            to="/update-training-item"
            class="block px-6 mb-4 hover:bg-gray-600 rounded"
            >トレーニング項目</router-link
          >
        </li>
        <li class="border-b md:border-none text-gray-200">
          <router-link
            to="/login"
            class="block px-6 mb-4 hover:bg-gray-600 rounded"
            >ユーザ選択</router-link
          >
        </li>
      </ul>
    </div>
  </header>
</template>
