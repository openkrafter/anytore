<script>
import Home from '@/components/pages/Home.vue'

export default {
  components: {
    Home,
  },
}
</script>

<template>
  <router-link to="/">Home</router-link> ・
  <router-link to="/edit">Edit</router-link>
  <h1>My ToDo App</h1>
  <router-view />
</template>

<style>
body {
  /* background-color: #eee; */
}
</style>
