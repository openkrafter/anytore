<script lang="js">
import { reactive, defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const hello = reactive({ message: '' })
    console.log("testsssss")

    onMounted(async () => {
      const res = await fetch('/training-items')
      hello.message = await res.json()

      const res2 = await fetch('/training-items/2')
      // hello.message = await res2.json()
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
