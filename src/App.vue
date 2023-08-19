<script lang="js">
import { reactive, defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const hello = reactive({ message: '' })

    onMounted(async () => {
      const res = await fetch('/training-items')
      hello.message = await res.json()
    })

    return { hello }
  },
})
</script>

<template>
  <!--<router-view />  -->
</template>

<style>
body {
  /* background-color: #eee; */
}
</style>
