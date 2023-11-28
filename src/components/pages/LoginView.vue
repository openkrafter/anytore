<script>
import DisplayUsers from '@/components/containers/DisplayUsers.vue'

export default {
  components: {
    DisplayUsers,
  },
}
</script>

<template>
  <div class="m-4">
    <div class="flex justify-between">
      <h1 class="text-4xl">ユーザ選択・登録画面</h1>
    </div>
    <div class="mt-4 ml-4">
      <DisplayUsers />
    </div>
  </div>
</template>
