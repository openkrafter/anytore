<script>
import logger from '@/logger'
import LightBlueButton from '@/components/basics/LightBlueButton.vue'
import { mapActions, mapState } from 'pinia'
import {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
} from '@/components/apis/User.vue'
import { User } from '@/components/models/User.vue'

export default {
  components: {
    LightBlueButton,
  },

  data() {
    return {
      users: [],
      userInput: {
        name: '',
        email: '',
        password: '',
      },
      editingUser: {},
      editingUserId: null,
    }
  },
  methods: {
    async fetchUsers() {
      this.users = await listUsers()
    },

    async addUser() {
      if (this.userInput.name === '')
        return alert('新規ユーザ名を入力してください')

      var newUser = new User(
        null,
        this.userInput.name,
        this.userInput.email,
        this.userInput.password
      )

      await createUser(this.userInput)
      this.users = await listUsers()
      this.clearInput()
    },

    async saveUser() {
      await updateUser(this.editingUser)
      this.users = await listUsers()
      this.clearInput()
    },

    editUser(user) {
      this.editingUser = {
        ...user,
        password: '',
      }
      this.editingUserId = user.id
    },

    async deleteUser(id) {
      await deleteUser(id)
      this.users = await listUsers()
    },

    clearInput() {
      this.userInput = {
        name: '',
        email: '',
        password: '',
      }
      this.editingUserId = null
    },
  },
  mounted() {
    this.fetchUsers()
  },
}
</script>

<template>
  <div>
    <h3 class="text-2xl">新規ユーザの追加</h3>
    <div class="mt-2 ml-4">
      <form @submit.prevent="addUser">
        <p class="mt-2">
          <input
            type="text"
            v-model="userInput.name"
            placeholder="Name"
            class="ml-2"
          />
        </p>
        <p class="mt-2">
          <input
            type="text"
            v-model="userInput.email"
            placeholder="Email"
            class="ml-2"
          />
        </p>
        <p class="mt-2">
          <input
            type="password"
            v-model="userInput.password"
            placeholder="Password"
            class="ml-2"
          />
        </p>
        <p class="mt-4">
          <LightBlueButton type="submit" class="ml-2">
            ユーザ追加
          </LightBlueButton>
        </p>
      </form>
    </div>
    <h3 class="text-2xl mt-8">ユーザ一覧</h3>
    <div class="mt-4">
      <LightBlueButton @click="fetchUsers"> 一覧表示の更新 </LightBlueButton>
    </div>
    <ul class="mt-4">
      <li class="mt-2" v-for="user in users" :key="user.id">
        <LightBlueButton class="ml-2" @click="editUser(user)">
          編集
        </LightBlueButton>
        <LightBlueButton class="ml-2 mr-4" @click="deleteUser(user.id)">
          削除
        </LightBlueButton>
        {{ user.name }} - {{ user.email }}
        <div v-if="editingUserId === user.id">
          <form @submit.prevent="saveUser">
            <p class="mt-2">
              <input
                type="text"
                v-model="editingUser.name"
                placeholder="Name"
                class="ml-2"
              />
            </p>
            <p class="mt-2">
              <input
                type="text"
                v-model="editingUser.email"
                placeholder="Email"
                class="ml-2"
              />
            </p>
            <p class="mt-2">
              <input
                type="password"
                v-model="editingUser.password"
                placeholder="Password"
                class="ml-2"
              />
            </p>
            <p class="mt-4">
              <LightBlueButton type="submit" class="ml-2">
                更新
              </LightBlueButton>
            </p>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>
