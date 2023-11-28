<script>
import logger from '@/logger'
import LightBlueButton from '@/components/basics/LightBlueButton.vue'
import { createUser } from '@/components/apis/User.vue'
import { User } from '@/components/models/User.vue'
import { mapActions, mapStores } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  components: {
    LightBlueButton,
  },

  data() {
    return {
      users: [],
      selectedUserId: '',
      newUserName: '',
      trainingItems: [],
    }
  },

  computed: {
    ...mapStores(useUserStore),

    trainingItemUnitName() {
      return this.trainingItems.map((trainingItem) => {
        if (trainingItem.unit == 'hour') {
          return '時間 (h)'
        } else if (trainingItem.unit == 'minute') {
          return '時間 (min)'
        } else if (trainingItem.unit == 'count') {
          return '回数'
        } else if (trainingItem.unit == 'distance') {
          return '距離'
        }
      })
    },
  },

  async created() {
    this.selectedUserId = this.userStore.user.id
    await this.getUsers()
  },

  methods: {
    ...mapActions(useUserStore, ['setUser']),

    // Get existing users
    async getUsers() {
      const path = '/users'
      const response = await fetch(path)
      const usersResults = await response.json()
      this.users = []
      this.users.push(...usersResults)
    },

    // Create and add a new user
    async addUser() {
      logger.trace('add new user')
      if (this.newUserName === '')
        return alert('新規ユーザ名を入力してください')

      var user = new User(null, this.newUserName)
      await createUser(user)

      // Get updated users to refresh the list of users
      await this.getUsers()
      logger.trace(this.users)
    },

    // Login as a selected user
    loginUser() {
      logger.trace('login user')
      this.users.map((user) => {
        if (user.id == this.selectedUserId) {
          this.setUser(new User(user.id, user.name))
          logger.trace(user)
          return alert(user.name + ' さんを選択しました！')
        }
      })
    },
  },
}
</script>

<template>
  <h2 class="text-2xl">ユーザ選択</h2>
  <div class="m-4">
    <div class="flex items-center mb-4" v-for="user in users">
      <label>
        <input
          id="user"
          name="user"
          type="radio"
          v-model="selectedUserId"
          :value="user.id"
          class="mr-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        {{ user.name }}
      </label>
    </div>
  </div>
  <div class="ml-4">
    <LightBlueButton @click="loginUser" class="w-30"> Login </LightBlueButton>
  </div>

  <h2 class="text-2xl mt-10">ユーザ登録</h2>
  <div class="m-4">
    <input
      type="text"
      name="name"
      id="name"
      v-model="newUserName"
      class="mb-4 rounded-lg bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
      placeholder="(新規ユーザ名)"
      required
    />
    <LightBlueButton @click="addUser"> 登録 </LightBlueButton>
  </div>
</template>
