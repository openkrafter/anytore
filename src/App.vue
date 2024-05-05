<script lang="js">
import { reactive, defineComponent, onMounted } from 'vue'
import LoginHeader from './components/containers/LoginHeader.vue'
import AdminHeader from './components/containers/AdminHeader.vue'
import UserHeader from '@/components/containers/UserHeader.vue'

export default defineComponent({
  name: 'App',

  components: {
    LoginHeader,
    AdminHeader,
    UserHeader,
  },
  computed: {
    isLoginHeader() {
      return this.$route.meta.headerType === 'login'
    },
    isAdminHeader() {
      return this.$route.meta.headerType === 'admin'
    },
    isUserHeader() {
      return this.$route.meta.headerType === 'user'
    },
  },

  setup() {
    console.log("start App")
    return { }
  },
})
</script>

<template>
  <LoginHeader v-if="isLoginHeader" />
  <AdminHeader v-if="isAdminHeader" />
  <UserHeader v-if="isUserHeader" />
  <div>
    <router-view />
  </div>
</template>
