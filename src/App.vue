<script lang="js">
import { reactive, defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'App',

  setup() {
    console.log("start App")

    // mock test
    testGetApi('/training-items')
    testGetApi('/training-items/2')
    testPostApi('/training-items', { id: 3, name: 'posttest' })
    testPutApi('/training-items/4', { id: 4, name: 'puttest' })
    testDeleteApi('/training-items/5')

    return { }
  },
})

function testGetApi(path) {
  onMounted(async () => {
    const response = reactive({ message: '' })
    const res = await fetch(path)
    response.message = await res.json()
  })
}

function testPostApi(path, data) {
  onMounted(async () => {
    const response = reactive({ message: '' })
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    response.message = await res.json()
  })
}

function testPutApi(path, data) {
  onMounted(async () => {
    const response = reactive({ message: '' })
    const res = await fetch(path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    response.message = await res.json()
  })
}

function testDeleteApi(path) {
  onMounted(async () => {
    const response = reactive({ message: '' })
    const res = await fetch(path, {
      method: 'DELETE',
    })
    response.message = await res.json()
  })
}
</script>

<template>
  <!--<router-view />  -->
</template>

<style>
body {
  /* background-color: #eee; */
}
</style>
